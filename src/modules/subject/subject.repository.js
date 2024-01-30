import { Postgres } from "../../lib/pg.js";

export class SubjectRepository extends Postgres {
  async findAll() {
    return await this.fetchAll(`select * from subjects`);
  }

  async findOneByName(name){
    return await this.fetch(`select * from subjects where name = $1`, name)
  }

  async findOneById(id) {
    return await this.fetch(`select * from subjects where id = $1`, id);
  }

  async insert(dto) {
    return await this.fetch(
      `insert into subjects (name, brand_id) values($1, $2) returning *`,
      dto.name, 
      dto.brand_id,
    );
  }

  async update(dto){
    return await this.fetch(
      `UPDATE subjects SET name = $2, brand_id = $3 WHERE id = $1 returning * `,
      dto.id,
      dto.name, 
      dto.brand_id,
    )
  }

  async delete(id) {
    return await this.fetch(
      `delete from subjects where id = $1 returning *`,
      id
    );
  }
}
