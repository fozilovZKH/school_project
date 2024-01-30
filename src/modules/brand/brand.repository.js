import { Postgres } from "../../lib/pg.js";

export class BrandRepository extends Postgres {
  async findAll() {
    return await this.fetchAll(`select * from brands`);
  }

  async findOneByName(name){
    return await this.fetch(`select * from brands where name = $1`, name)
  }

  async findOneById(id) {
    return await this.fetch(`select * from brands where id = $1`, id);
  }

  async insert(dto) {
    return await this.fetch(
      `insert into brands(name, is_public) values($1, COALESCE($2, true)) returning *`,
      dto.name,
      dto.is_public
    );
  }

  async update(dto){
    return await this.fetch(
      `UPDATE brands SET name = $2, is_public = COALESCE($3, true) WHERE id = $1 returning * `,
      dto.id,
      dto.name,
      dto.is_public
    )
  }

  async delete(id) {
    return await this.fetch(
      `delete from brands where id = $1 returning *`,
      id
    );
  }
}
