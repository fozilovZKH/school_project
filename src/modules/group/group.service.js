import { ResData } from "../../common/resData.js";
import { GroupEntity } from "./entity/group.entity.js";
import {
  GroupBadRequestException,
  GroupNotFoundException,
} from "./exception/group.exception.js";

import { GroupRepository } from "./group.repository.js";

export class GroupService {
  #repository;
  constructor() {
    this.#repository = new GroupRepository();
  }

  // Get all
  async getAll() {
    const foundAll = await this.#repository.findAll();

    const resData = new ResData("success get all", 200, foundAll);

    return resData;
  }

  // Create
  async create(dto) {
    const newGroup = new GroupEntity(dto);
    await this.#repository.insert(newGroup);
    return new ResData("group created successfully", 201, {
      group: newGroup,
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
  async getGroupById(id) {
    const foundGroupById = await this.#repository.findOneById(id);
    if (!foundGroupById) {
      throw new GroupNotFoundException();
    }
    return new ResData("Found user", 200, foundGroupById);
  }

  // Update By Id
  async updateGroup(id, dto) {
    await this.getGroupById(id);

    const updateGroup = new GroupEntity(dto)
    updateGroup.id = id

    const updatedGroup = await this.#repository.update(updateGroup);

    const resData = new ResData("Updated successfully!", 200, {
      group: updatedGroup,
    });

    return resData;
  }

  // Delete By Id
  async deleteGroup(id) {
    await this.getGroupById(id);
    const deletedGroup = await this.#repository.delete(id);
    return new ResData("Deleted successfully!", 200, {
      group: deletedGroup,
    });
  }
}
