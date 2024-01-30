import { ResData } from "../../common/resData.js";
import { validationSchema } from "../../lib/validationSchema.js";
import { GroupBadRequestException, GroupNotCreatedException, GroupNotFoundException} from "./exception/group.exception.js";
import { groupGetByIdSchema, createGroupSchema, updategroupSchema } from "./validation/group.schema.js";

export class GroupController {
  #userService;
  #groupService; #brandService;
  constructor(groupService, userService, brandService) {
    this.#groupService = groupService;
    this.#userService = userService;
    this.#brandService = brandService;
  }

  // GET ALL 
  async getAll(req, res) {
    try {
      const resData = await this.#groupService.getAll();

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

      validationSchema(createGroupSchema, dto);

      await this.#userService.findById(dto.userId);
      await this.#brandService.getBrandById(dto.brandId);

      const resData = await this.#groupService.create(dto);

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
      const validated = groupGetByIdSchema.validate(req.params);
      if (validated.error) {
        throw new GroupBadRequestException(validated.error.message);
      }
      const resData = await this.#groupService.getGroupById(dto);
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
      validationSchema(updategroupSchema, dto);
    
      await this.#userService.findById(dto.userId);
      await this.#brandService.getBrandById(dto.brandId);

      console.log("dto: ", dto);
      const resData = await this.#groupService.updatedGroup(id, dto);
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
      const validated = groupGetByIdSchema.validate(req.params);
      if (validated.error) {
        throw new GroupBadRequestException(validated.error.message);
      }
      const resData = await this.#groupService.deleteGroup(id);
      return res.status(resData.statusCode).json(resData);
    } catch (error) {
      const resData = new ResData(error.message, 400, null, error);
      return res.status(resData.statusCode).json(resData);
    }
  }
}
