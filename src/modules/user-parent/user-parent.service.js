import { ResData } from "../../common/resData.js";
import { UserParentEntity } from "./entity/user-parent.entity.js";
import {
  BadRequestException,
  NotCreatedException,
  NotFoundException,
} from "./exception/user-parent.exception.js";

import { UserParentRepository } from "./user-parent.repository.js";

export class UserParentService {
  #repository;
  constructor() {
    this.#repository = new UserParentRepository();
  }

  // Get all
  async getAll() {
    const foundAll = await this.#repository.findAll();

    const resData = new ResData("success get all", 200, foundAll);

    return resData;
  }

  // Create
  async create(dto) {
    const newUserParent = new UserParentEntity(dto);
    await this.#repository.insert(newUserParent);
    return new ResData("userParent created successfully", 201, {
      userParent: newUserParent,
    });
  }

  // Find by name
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

  // Get By ID
  async getUserParentById(id) {
    const foundUserParentById = await this.#repository.findOneById(id);
    if (!foundUserParentById) {
      throw new NotFoundException();
    }
    return new ResData("Found user", 200, foundUserParentById);
  }

  // Update By Id
  async updateUserParent(id, dto) {
    await this.getUserParentById(id);
    const updateUserParent = new UserParentEntity(dto)
    updateUserParent.id = id

    const updatedUserParent = await this.#repository.update(updateUserParent);

    const resData = new ResData("Updated successfully!", 200, {
      userParent: updatedUserParent,
    });

    return resData;
  }

  // Delete By Id
  async deleteUserParent(id) {
    await this.getUserParentById(id);
    const deletetUserParent = await this.#repository.delete(id);
    return new ResData("Deleted successfully!", 200, {
      userParent: deletetUserParent,
    });
  }
}
