import { Postgres } from "../../lib/pg.js";

export class UserParentRepository extends Postgres {
  async findAll() {
    return await this.fetchAll(`select * from user_parents`);
  }

  async findOneById(id) {
    return await this.fetch(`select * from user_parents where id = $1`, id);
  }

  async insert(dto) {
    return await this.fetch(
      `insert into user_parents (child_id, parent_id) values($1, $2) returning *`,
      dto.child_id, 
      dto.parent_id,
    );
  }

  async update(dto){
    return await this.fetch(
      `UPDATE user_parents SET child_id = $2, parent_id = $3 WHERE id = $1 returning * `,
      dto.id,
      dto.child_id, 
      dto.parent_id,
    )
  }

  async delete(id) {
    return await this.fetch(
      `delete from user_parents where id = $1 returning *`,
      id
    );
  }
}
