import { Postgres } from "../../lib/pg.js";

export class GroupRepository extends Postgres {
  async findAll() {
    return await this.fetchAll(`select * from groups`);
  }

  async findOneById(id) {
    return await this.fetch(`select * from groups where id = $1`, id);
  }

  async insert(dto) {
    return await this.fetch(
      `insert into groups (name, brand_id, head_teacher_id, room_id) values($1, $2, $3, $4) returning *`,
      dto.name, 
      dto.brand_id,
      dto.head_teacher_id,
      dto.room_id
    );
  }

  async update(dto){
    return await this.fetch(
      `UPDATE groups SET name = $2, brand_id = $3, head_teacher_id = $4, room_id = $5 WHERE id = $1 returning * `,
      dto.id,
      dto.name, 
      dto.brand_id,
      dto.head_teacher_id,
      dto.room_id
    )
  }

  async delete(id) {
    return await this.fetch(
      `delete from groups where id = $1 returning *`,
      id
    );
  }
}
