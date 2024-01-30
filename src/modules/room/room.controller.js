import { ResData } from "../../common/resData.js";
import { validationSchema } from "../../lib/validationSchema.js";
import { RoomNotCreatedException, RoomBadRequestException,RoomNotFoundException } from "./exception/room.exception.js";
import { createRoomSchema, roomGetByIdSchema, updateRoomSchema, } from "./validation/room.schema.js";

export class RoomController {
  #schoolService;
  #roomService;
  constructor(roomService, schoolService) {
    this.#roomService = roomService;
    this.#schoolService = schoolService;
  }

  // GET ALL Rooms
  async getAll(req, res) {
    try {
      const resData = await this.#roomService.getAll();

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

      validationSchema(createRoomSchema, dto);

      await this.#schoolService.getSchoolById(dto.schoolId);

      const resData = await this.#roomService.create(dto);

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

  // Room Get By Id
  async getRoomById(req, res) {
    try {
      const dto = req.params.id;
      const validated = roomGetByIdSchema.validate(req.params);
      if (validated.error) {
        throw new RoomBadRequestException(validated.error.message);
      }
      const resData = await this.#roomService.getRoomById(dto);
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

  // Update Rooms By Id
  async updateRoomById(req, res) {
    try {
      const id = req.params?.id;
      const dto = req.body;
      validationSchema(updateRoomSchema, dto);
    
      await this.#schoolService.getSchoolById(dto.schoolId);

      console.log("dto: ", dto);
      const resData = await this.#roomService.updateRoom(id, dto);
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

  // Delete Room By Id
  async deleteRoomById(req, res) {
    try {
      const id = req.params.id;
      const validated = roomGetByIdSchema.validate(req.params);
      if (validated.error) {
        throw new RoomBadRequestException(validated.error.message);
      }
      const resData = await this.#roomService.deleteRoom(id);
      return res.status(resData.statusCode).json(resData);
    } catch (error) {
      const resData = new ResData(error.message, 400, null, error);
      return res.status(resData.statusCode).json(resData);
    }
  }
}
