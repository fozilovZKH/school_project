import { Postgres } from "../../lib/pg.js";

export class UserRepository extends Postgres {
  async findAll() {
    return await this.fetchAll("select * from users");
  }
  async findOneByLogin(login) {
    return await this.fetch("select * from users where login = $1", login);
  }
  async findOneById(id) {
    return await this.fetch("select * from users where id = $1", id);
  }
  async insert(dto) {
    return await this.fetch(
      `insert into users
    (login, password, role, sex, first_name, last_name, phone, group_id, brand_id)
    values ($1, $2, $3, $4, $5, $6, $7, $8) returning *
    `,
      dto.login,
      dto.password,
      dto.role,
      dto.sex,
      dto.first_name,
      dto.last_name,
      dto.phone,
      dto.group_id,
      dto.brand_id
    );
  }

  async update(dto) {
    return await this.fetch(
      `UPDATE users SET login = $2, password = $3, role = $4, sex = $5, first_name = $6, last_name = $7, address = $8, latitude = $9, longtitude = $10, phone = $11, group_id = $12, brand_id = $13  WHERE id = $1 returning * `,
      dto.id,
      dto.login,
      dto.password,
      dto.role,
      dto.sex,
      dto.first_name,
      dto.last_name,
      dto.address,
      dto.latitude,
      dto.longitude,
      dto.phone,
      dto.group_id,
      dto.brand_id
    );
  }

  async delete(id) {
    return await this.fetch(`delete from users where id = $1 returning *`, id);
  }
}
