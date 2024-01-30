import { ResData } from "../../common/resData.js";
import { SubjectEntity } from "./entity/subject.entity.js";
import {
  SubjectBadRequestException,
  SubjectNotCreatedException,
  SubjectNotFoundException,
} from "./exception/subject.exception.js";

import { SubjectRepository } from "./subject.repository.js";

export class SubjectService {
  #repository;
  constructor() {
    this.#repository = new SubjectRepository();
  }

  // Get all Rooms
  async getAll() {
    const foundAll = await this.#repository.findAll();

    const resData = new ResData("success get all", 200, foundAll);

    return resData;
  }

  // Create
  async create(dto) {
    const newSubject = new SubjectEntity(dto);
    await this.#repository.insert(newSubject);
    return new ResData("Subject created successfully", 201, {
      subject: newSubject,
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
  async getSubjectById(id) {
    const foundSubjectById = await this.#repository.findOneById(id);
    if (!foundSubjectById) {
      throw new SubjectNotFoundException();
    }
    return new ResData("Found room", 200, foundSubjectById);
  }

  // Update By Id
  async updateSubject(id, dto) {
    await this.getSubjectById(id);
    const updateSubject = new SubjectEntity(dto) 
    updateSubject.id = id

    const updatedSubject = await this.#repository.update(updateSubject);

    const resData = new ResData("Updated successfully!", 200, {
      subject: updatedSubject,
    });

    return resData;
  }

  // Delete By Id
  async deleteSubject(id) {
    await this.getSubjectById(id);
    const deletetSubject = await this.#repository.delete(id);
    return new ResData("Deleted successfully!", 200, {
      subject: deletetSubject,
    });
  }
}
