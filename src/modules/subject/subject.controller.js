import { ResData } from "../../common/resData.js";
import { validationSchema } from "../../lib/validationSchema.js";
import { SubjectBadRequestException, SubjectNotCreatedException, SubjectNotFoundException} from "./exception/subject.exception.js";
import { createSubjectSchema, subjectGetByIdSchema, updateSubjectSchema, } from "./validation/subject.schema.js";

export class SubjectController {
  #brandService;
  #subjectService;
  constructor(subjectService, brandService) {
    this.#subjectService = subjectService;
    this.#brandService = brandService;
  }

  // GET ALL 
  async getAll(req, res) {
    try {
      const resData = await this.#subjectService.getAll();

      return res.status(resData.statusCode).json(resData);
    } catch (error) {
      const resData = new ResData(
        error.message,
        error.statusCode || 500,
        null,
        error
      );
      res.status(resData.statusCode).json(resData);
    }
  }

  async create(req, res) {
    try {
      const dto = req.body;

      validationSchema(createSubjectSchema, dto);

      await this.#brandService.getBrandById(dto.brandId);

      const resData = await this.#subjectService.create(dto);

      return res.status(resData.statusCode).json(resData);
    } catch (error) {
      const resData = new ResData(
        error.message,
        error.statusCode || 500,
        null,
        error
      );

      res.status(resData.statusCode).json(resData);
    }
  }

  // Get By Id
  async getById(req, res) {
    try {
      const dto = req.params.id;
      const validated = subjectGetByIdSchema.validate(req.params);
      if (validated.error) {
        throw new SubjectBadRequestException(validated.error.message);
      }
      const resData = await this.#subjectService.getSubjectById(dto);
      return res.status(resData.statusCode).json(resData);
    } catch (error) {
      const resData = new ResData(
        error.message,
        error.statusCode || 500,
        null,
        error
      );

      res.status(resData.statusCode).json(resData);
    }
  }

  // Update By Id
  async updateById(req, res) {
    try {
      const id = req.params?.id;
      const dto = req.body;
      validationSchema(updateSubjectSchema, dto);
    
      await this.#brandService.getBrandById(dto.brandId);

      console.log("dto: ", dto);
      const resData = await this.#subjectService.updateSubject(id, dto);
      return res.status(resData.statusCode).json(resData);
    } catch (error) {
      const resData = new ResData(
        error.message,
        error.statusCode || 500,
        null,
        error
      );
      return res.status(resData.statusCode).json(resData);
    }
  }

  // Delete By Id
  async deleteById(req, res) {
    try {
      const id = req.params.id;
      const validated = subjectGetByIdSchema.validate(req.params);
      if (validated.error) {
        throw new SubjectBadRequestException(validated.error.message);
      }
      const resData = await this.#subjectService.deleteSubject(id);
      return res.status(resData.statusCode).json(resData);
    } catch (error) {
      const resData = new ResData(error.message, 400, null, error);
      return res.status(resData.statusCode).json(resData);
    }
  }
}
