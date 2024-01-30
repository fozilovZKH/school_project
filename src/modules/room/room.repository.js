import { Postgres } from "../../lib/pg.js";

export class RoomRepository extends Postgres {
  async findAll() {
    return await this.fetchAll(`select * from rooms`);
  }

  async findOneByName(name){
    return await this.fetch(`select * from rooms where name = $1`, name)
  }

  async findOneById(id) {
    return await this.fetch(`select * from rooms where id = $1`, id);
  }

  async insert(dto) {
    return await this.fetch(
      `insert into rooms (number, name, floor, capacity, school_id) values($1, $2, $3, $4, $5) returning *`,
      dto.number,
      dto.name, 
      dto.floor,
      dto.capacity,
      dto.school_id,
    );
  }

  async update(dto){
    return await this.fetch(
      `UPDATE rooms SET number = $2, name = $3, floor = $4, capacity = $5, school_id = $6 WHERE id = $1 returning * `,
      dto.id,
      dto.number,
      dto.name, 
      dto.floor,
      dto.capacity,
      dto.school_id,
    )
  }

  async delete(id) {
    return await this.fetch(
      `delete from rooms where id = $1 returning *`,
      id
    );
  }
}
