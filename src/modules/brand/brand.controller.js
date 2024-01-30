import { ResData } from "../../common/resData.js";
import { validationSchema } from "../../lib/validationSchema.js";
import { BrandNameAlreadyExistException, BrandBadRequestException, } from "./exception/brand.exception.js";
import { createBrandSchema, brandGetByIdSchema, brandUpdateSchema, } from "./validation/brand.schema.js";

export class BrandController {
  #brandService;
  constructor(brandService) {
    this.#brandService = brandService;
  }

  // GET ALL Brands
  async getAll(req, res) {
    try {
      const resData = await this.#brandService.getAll();

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

      validationSchema(createBrandSchema, dto);

      const resDataGetByName = await this.#brandService.findByName(dto.name);

      if (resDataGetByName.data) {
        throw new BrandNameAlreadyExistException();
      }

      const resData = await this.#brandService.create(dto);

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

  // Brand Get By Id
  async getBrandById(req, res) {
    try {
      const dto = req.params.id;
      const validated = brandGetByIdSchema.validate(req.params);
      if (validated.error) {
        throw new BrandBadRequestException(validated.error.message);
      }
      const resData = await this.#brandService.getBrandById(dto);
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

  // Update Brands By Id
  async updateBrandById(req, res) {
    try {
      const id = req.params.id;
      const dto = req.body;
      validationSchema(brandUpdateSchema, dto);
      const resDataGetByName = await this.#brandService.findByName(dto.name);
      if (resDataGetByName.data) {
        throw new BrandNameAlreadyExistException();
      }

      console.log("dto: ", dto);
      const resData = await this.#brandService.updateBrand(id, dto);
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

  // Delete Brand By Id
  async deleteBrandById(req, res) {
    try {
      const id = req.params.id;
      const validated = brandGetByIdSchema.validate(req.params);
      if (validated.error) {
        throw new BrandBadRequestException(validated.error.message);
      }
      const resData = await this.#brandService.deleteBrand(id);
      return res.status(resData.statusCode).json(resData);
    } catch (error) {
      const resData = new ResData(error.message, 400, null, error);
      return res.status(resData.statusCode).json(resData);
    }
  }
}
