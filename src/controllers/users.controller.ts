import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import UsersRepository from "../repositories/users.repository";

const usersRepository = new UsersRepository();

export class UsersController {
  async getAllUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await usersRepository.findAllUsers();
      return res.status(StatusCodes.OK).json(users);
    } catch (err) {
      next(err);
    }
  }

  async getUniqueUser(req: Request<{ uuid: string }>, res: Response, next: NextFunction) {
    try {
      const { uuid } = req.params;
      const user = await usersRepository.findOneById(uuid);
      if (!user) {
        return res
          .status(StatusCodes.NOT_FOUND)
          .send({ status: StatusCodes.NOT_FOUND, message: "Usuário não existe" });
      }
      return res.status(StatusCodes.OK).json(user);
    } catch (err) {
      next(err);
    }
  }

  async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { username, password } = req.body;

      const findUser = await usersRepository.findByUsername(username);
      if (findUser) {
        return res.status(StatusCodes.OK).send({ status: StatusCodes.OK, message: `Username já existe` });
      }

      const newUser = await usersRepository.createUser({ username, password });
      if (!newUser) {
        return res
          .status(StatusCodes.NOT_FOUND)
          .send({ status: StatusCodes.NOT_FOUND, message: "Erro ao criar usuário" });
      }
      return res.status(StatusCodes.OK).json(newUser);
    } catch (err) {
      next(err);
    }
  }

  async updateUser(req: Request<{ uuid: string }>, res: Response, next: NextFunction) {
    try {
      const { uuid } = req.params;
      const { username, password } = req.body;

      const findUser = await usersRepository.findByUsername(username);
      if (!findUser) {
        return res.status(StatusCodes.OK).send({ status: StatusCodes.OK, message: `Usuário não existe` });
      }

      const updateUser = await usersRepository.updateUser({ uuid, username, password });
      if (!updateUser) {
        return res
          .status(StatusCodes.NOT_FOUND)
          .send({ status: StatusCodes.NOT_FOUND, message: "Erro ao atualizar usuário" });
      }
      return res.status(StatusCodes.OK).json(updateUser);
    } catch (err) {
      next(err);
    }
  }

  async deleteUser(req: Request<{ uuid: string }>, res: Response, next: NextFunction) {
    try {
      const { uuid } = req.params;

      const findUser = await usersRepository.findOneById(uuid);
      if (!findUser) {
        return res
          .status(StatusCodes.NOT_FOUND)
          .send({ status: StatusCodes.NOT_FOUND, message: `Usuário não existe` });
      }

      await usersRepository.deleteUser(uuid);
      return res
        .status(StatusCodes.OK)
        .send({ status: StatusCodes.OK, message: `Usuário deletado com sucesso` });
    } catch (err) {
      next(err);
    }
  }
}
