import db from "../database";
import User from "../models/users.model";
import DatabaseError from "./../models/errors/databaseError.model";
import auth from "../config/auth";

class UsersRepository {
  secret = auth.secret;
  async findAllUsers(): Promise<User[] | null> {
    try {
      const query = `
                SELECT uuid,username
                FROM application_user
            `;

      const { rows } = await db.query<User>(query);
      return rows || null;
    } catch (err) {
      throw new DatabaseError("Erro na busca por todos usuarios", err);
    }
  }

  async findOneById(id: string): Promise<User | null> {
    try {
      const query = `
                SELECT uuid,username
                FROM application_user
                WHERE uuid = $1 
            `;

      const params = [id];
      const { rows } = await db.query<User>(query, params);
      const [user] = rows;
      return user || null;
    } catch (err) {
      throw new DatabaseError("Erro na busca por ID", err);
    }
  }

  async findByUsername(username: string): Promise<User | null> {
    try {
      const query = `
                SELECT uuid,username,password
                FROM application_user
                WHERE username = $1 
            `;

      const params = [username];
      const { rows } = await db.query<User>(query, params);
      const [user] = rows;
      return user || null;
    } catch (err) {
      throw new DatabaseError("Erro na busca por username e senha", err);
    }
  }

  async createUser(user: User): Promise<string> {
    try {
      const query = `
                INSERT INTO application_user
                (username,password)
                VALUES ($1, crypt($2, '${this.secret}'))
                RETURNING uuid
            `;

      const params = [user.username, user.password];
      const { rows } = await db.query<{ uuid: string }>(query, params);
      const [newUser] = rows;
      return newUser.uuid;
    } catch (err) {
      throw new DatabaseError("Erro na criação do usuario", err);
    }
  }

  async updateUser(user: User): Promise<User> {
    try {
      const query = `
                UPDATE application_user
                SET username = $2, password = crypt($3, '${this.secret}')
                WHERE uuid = $1
                RETURNING (uuid, username, password)
            `;

      const params = [user.uuid, user.username, user.password];
      const { rows } = await db.query<User>(query, params);
      const [updatedUser] = rows;
      return updatedUser;
    } catch (err) {
      throw new DatabaseError("Erro no update do usuario", err);
    }
  }

  async deleteUser(id: string): Promise<void> {
    try {
      const query = `
                DELETE FROM application_user
                WHERE uuid = $1
            `;

      const params = [id];
      await db.query(query, params);
    } catch (err) {
      throw new DatabaseError("Erro no delete do usuario", err);
    }
  }
}

export default UsersRepository;
