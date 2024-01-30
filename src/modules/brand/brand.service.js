import { ResData } from "../../common/resData.js";
import { BrandEntity } from "./entity/brand.entity.js";
import {
  BrandNameAlreadyExistException,
  BrandNotCreatedException,
  BrandNotFoundException,
} from "./exception/brand.exception.js";
import { BrandRepository } from "./brand.repository.js";

export class BrandService {
  #repository;
  constructor() {
    this.#repository = new BrandRepository();
  }

  // Get all Brands
  async getAll() {
    const foundAll = await this.#repository.findAll();

    const resData = new ResData("success get all", 200, foundAll);

    return resData;
  }

  // Create brand
  async create(dto) {
    const newBrand = new BrandEntity(dto);
    console.log(newBrand);
    await this.#repository.insert(newBrand);
    return new ResData("Brand created successfully", 201, {
      brand: newBrand,
    });
  }

  // Find brand by name
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

  // Get Brand By ID
  async getBrandById(id) {
    const foundBrandById = await this.#repository.findOneById(id);
    if (!foundBrandById) {
      throw new BrandNotFoundException();
    }
    return new ResData("Found Brand", 200, foundBrandById);
  }

  // Update Brand By Id
  async updateBrand(id, dto) {
    await this.getBrandById(id);
    const updateBrand = new BrandEntity(dto)
    updateBrand.id = id

    const updatedBrand = await this.#repository.update(updateBrand);

    const resData = new ResData("Updated successfully!", 200, {
      brand: updatedBrand,
    });

    return resData;
  }

  // Delete Brand By Id
  async deleteBrand(id) {
    await this.getBrandById(id);
    const deletedBrand = await this.#repository.delete(id);
    return new ResData("Deleted successfully!", 200, {
      brand: deletedBrand,
    });
  }
}
