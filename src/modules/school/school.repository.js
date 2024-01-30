import { Postgres } from "../../lib/pg.js";

export class SchoolRepository extends Postgres {
  async findAll() {
    return await this.fetchAll("select * from schools");
  }

  async findOneById(id) {
    return await this.fetch(`select * from schools where id = $1`, id);
  }

  async insert(dto) {
    return await this.fetch(
      "insert into schools (name, address, latitude, longitude, phone, brand_id) values($1, $2, $3, $4, $5, $6) returning *",
      dto.name,
      dto.address,
      dto.latitude,
      dto.longitude,
      dto.phone,
      dto.brand_id
    );
  }

  async update(dto){
    return await this.fetch(
      "UPDATE schools SET name = $2, address = $3, latitude = $4, longtitude = $5, phone = $6, brand_id = $7 WHERE id = $1 RETURNING * ",
      dto.id,
      dto.name,
      dto.address,
      dto.latitude,
      dto.longitude,
      dto.phone,
      dto.brandId
    )
  }

  async delete(id) {
    return await this.fetch(
      "delete from schools where id = $1 returning *",
      id
    );
  }
}
