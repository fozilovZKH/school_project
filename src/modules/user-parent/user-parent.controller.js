import { ResData } from "../../common/resData.js";
import { validationSchema } from "../../lib/validationSchema.js";
import { BadRequestException, NotCreatedException, NotFoundException} from "./exception/user-parent.exception.js";
import { createSchema, GetByIdSchema, updateSchema, } from "./validation/user-parent.schema.js";

export class UserParentController {
  #userService;
  #userParentService;
  constructor(userParentService, userService) {
    this.#userParentService = userParentService;
    this.#userService = userService;
  }

  // GET ALL 
  async getAll(req, res) {
    try {
      const resData = await this.#userParentService.getAll();

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

      validationSchema(createSchema, dto);

      await this.#userService.findById(dto.userId);

      const resData = await this.#userParentService.create(dto);

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
      const validated = GetByIdSchema.validate(req.params);
      if (validated.error) {
        throw new BadRequestException(validated.error.message);
      }
      const resData = await this.#userParentService.getUserParentById(dto);
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
      validationSchema(updateSchema, dto);
    
      await this.#userService.findById(dto.userId);

      console.log("dto: ", dto);
      const resData = await this.#userParentService.updatedUserParent(id, dto);
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
      const validated = GetByIdSchema.validate(req.params);
      if (validated.error) {
        throw new BadRequestException(validated.error.message);
      }
      const resData = await this.#userParentService.deleteUserParent(id);
      return res.status(resData.statusCode).json(resData);
    } catch (error) {
      const resData = new ResData(error.message, 400, null, error);
      return res.status(resData.statusCode).json(resData);
    }
  }
}
