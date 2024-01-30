import { ResData } from "../../common/resData.js";
import { validationSchema } from "../../lib/validationSchema.js";
import {
  UserLoginAlreadyExistException,
  UserBadRequestException,
} from "./exception/user.exception.js";
import {
  userRegisterSchema,
  userLoginSchema,
  userGetByIdSchema,
  userUpdateSchema
} from "./validation/user.schema.js";

export class UserController {
  #userService;
  #brandService;
  constructor(userService, brandService) {
    this.#userService = userService;
    this.#brandService = brandService;
  }

  // Get All Users
  async getAll(req, res) {
    try {
      const resData = await this.#userService.getAll();

      res.status(resData.statusCode).json(resData);
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

  // Register
  async register(req, res) {
    try {
      const dto = req.body;

      validationSchema(userRegisterSchema, dto);

      const resDataGetByLogin = await this.#userService.findByLogin(dto.login);

      if (resDataGetByLogin.data) {
        throw new UserLoginAlreadyExistException();
      }

      await this.#brandService.getBrandById(dto.brandId);

      const resData = await this.#userService.create(dto);

      res.status(resData.statusCode).json(resData);
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

  // User Login
  async login(req, res) {
    try {
      const dto = req.body;
      validationSchema(userLoginSchema, dto);

      const resData = await this.#userService.login(dto);
      req.header("token", resData.data.token);
      return res.status(resData.statusCode).json(resData);
    } catch (error) {
      const resData = new ResData(error.message, error.statusCode, null, error);
      return res.status(error.statusCode).json(resData);
    }
  }

  // Delete By Id
  async deleteById(req, res) {
    try {
      const id = req.params.id;
      const validated = userGetByIdSchema.validate(req.params);
      if (validated.error) {
        throw new UserBadRequestException(validated.error.message);
      }
      const resData = await this.#userService.delete(id);
      return res.status(resData.statusCode).json(resData);
    } catch (error) {
      const resData = new ResData(error.message, 400, null, error);
      return res.status(resData.statusCode).json(resData);
    }
  }

    // Update By Id
    async updateById(req, res) {
      try {
        const id = req.params?.id;
        const dto = req.body;
        validationSchema(userUpdateSchema, dto);
        
        await this.#brandService.getBrandById(dto.brandId);

        console.log("dto: ", dto);
        const resData = await this.#userService.update(id, dto);
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
}
