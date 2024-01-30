import { ResData } from "../../common/resData.js";
import { validationSchema } from "../../lib/validationSchema.js";
import { SchoolBadRequestException, SchoolNotFoundByIdException } from "./exception/school.exception.js";
import { schoolSchema, schoolGetByIdSchema, schoolUpdateSchema } from "./validation/school.schema.js";


export class SchoolController {
  #schoolService;
  #brandService;
  constructor(schoolService, brandService) {
    this.#schoolService = schoolService;
    this.#brandService = brandService
  }

  // GET ALL schools
  async getAll(req, res) {
    try {
      const resData = await this.#schoolService.getAll();

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
  // Create school
  async create(req, res) {
    try {
      const dto = req.body;

      validationSchema(schoolSchema, dto);

      await this.#brandService.getBrandById(dto.brandId);

      const resData = await this.#schoolService.create(dto);

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

  // school Get By Id
  async getSchoolById(req, res) {
    try {
      const dto = req.params.id;
      const validated = schoolGetByIdSchema.validate(req.params);
      if (validated.error) {
        throw new SchoolBadRequestException(validated.error.message);
      }
      const resData = await this.#schoolService.getSchoolById(dto);
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

  // Update schools By Id
  async updateById(req, res) {
    try {
      const id = req.params?.id;
      const dto = req.body;
      validationSchema(schoolUpdateSchema, dto);

      await this.#brandService.getBrandById(dto.brandId);
      
      const resData = await this.#schoolService.updateSchool(id, dto);
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

  // Delete school By Id
  async deleteById(req, res) {
    try {
      const id = req.params.id;
      const validated = schoolGetByIdSchema.validate(req.params);
      if (validated.error) {
        throw new SchoolBadRequestException(validated.error.message);
      }
      const resData = await this.#schoolService.deleteSchool(id);
      return res.status(resData.statusCode).json(resData);
    } catch (error) {
      const resData = new ResData(error.message, 400, null, error);
      return res.status(resData.statusCode).json(resData);
    }
  }
}
