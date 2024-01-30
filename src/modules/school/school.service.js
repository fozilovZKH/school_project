import { ResData } from "../../common/resData.js";
import { SchoolRepository } from "./school.repository.js";
import {
  SchoolBadRequestException,
  SchoolNotFoundByIdException,SchoolNotCreatedException
} from "./exception/school.exception.js";
import { SchoolEntity } from "./entity/school.entity.js";

export class SchoolService {
  #repository;
  constructor() {
    this.#repository = new SchoolRepository();
  }

  // Get All Schools
  async getAll() {
    const foundAll = await this.#repository.findAll();
    const resData = new ResData("success get all", 200, foundAll);
    return resData;
  }

  async create(dto) {
    const newSchool = new SchoolEntity(dto);
    const createdSchool = await this.#repository.insert(newSchool);
    
    if (!createdSchool) {
        throw new SchoolNotCreatedException()    
    }
    return new ResData("School created successfully", 201, {
      school: createdSchool,
    });
  }

  // Get School By ID
  async getSchoolById(id) {
    const foundSchoolById = await this.#repository.findOneById(id);
    if (!foundSchoolById) {
      throw new SchoolNotFoundByIdException();
    }
    return new ResData("Found School", 200, foundSchoolById);
  }

  // Update School By Id
  async updateSchool(id, dto) {
    await this.getSchoolById(id);
    const updateSchool = new SchoolEntity(dto)
    updateSchool.id = id
    const updatedSchool = await this.#repository.update(updateSchool);

    const resData = new ResData("Updated successfully!", 200, {
      brand: updatedSchool,
    });

    return resData;
  }

  // Delete School By Id
  async deleteSchool(id) {
    await this.getSchoolById(id);
    const deletedSchool = await this.#repository.delete(id);
    return new ResData("Deleted successfully!", 200, {
        school: deletedSchool,
    });
  }

}
