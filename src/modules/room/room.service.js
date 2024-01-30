import { ResData } from "../../common/resData.js";
import { RoomEntity } from "./entity/room.entity.js";
import {
  RoomBadRequestException,
  RoomNotCreatedException,
  RoomNotFoundException,
} from "./exception/room.exception.js";

import { RoomRepository } from "./room.repository.js";

export class RoomService {
  #repository;
  constructor() {
    this.#repository = new RoomRepository();
  }

  // Get all Rooms
  async getAll() {
    const foundAll = await this.#repository.findAll();

    const resData = new ResData("success get all", 200, foundAll);

    return resData;
  }

  // Create room
  async create(dto) {
    const newRoom = new RoomEntity(dto);
    console.log(newRoom);
    await this.#repository.insert(newRoom);
    return new ResData("Room created successfully", 201, {
      room: newRoom,
    });
  }

  // Find room by name
  async findByName(name) {
    const foundByName = await this.#repository.findOneByName(name);

    let resData;

    if (foundByName) {
      resData = new ResData("success name", 200, foundByName);
    } else {
      resData = new ResData("name is already", 404, foundByName);
    }

    return resData;
  }

  // Get room By ID
  async getRoomById(id) {
    const foundRoomById = await this.#repository.findOneById(id);
    if (!foundRoomById) {
      throw new RoomNotFoundException();
    }
    return new ResData("Found room", 200, foundRoomById);
  }

  // Update room By Id
  async updateRoom(id, dto) {
    await this.getRoomById(id);
    const updateRoom = new RoomEntity(dto)
    updateRoom.id = id

    const updatedRoom = await this.#repository.update(updateRoom);

    const resData = new ResData("Updated successfully!", 200, {
      room: updatedRoom,
    });

    return resData;
  }

  // Delete room By Id
  async deleteRoom(id) {
    await this.getRoomById(id);
    const deletedRoom = await this.#repository.delete(id);
    return new ResData("Deleted successfully!", 200, {
      room: deletedRoom,
    });
  }
}
