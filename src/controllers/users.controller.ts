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
    };

    async getUniqueUser(req: Request<{ uuid: string }>, res: Response, next: NextFunction) {
        try {
            const { uuid } = req.params;
            const user = await usersRepository.findOneById(uuid);
            if (!user) {
                return res.status(StatusCodes.NOT_FOUND).send({ status: StatusCodes.NOT_FOUND, message: "User not found" });
            }
            return res.status(StatusCodes.OK).json(user);
        } catch (err) {
            next(err);
        }
    };

    async postUser(req: Request, res: Response, next: NextFunction) {
        try {
            const { username, password } = req.body;
            const newUser = await usersRepository.createUser({ username, password });
            if (!newUser) {
                return res.status(StatusCodes.NOT_FOUND).send({ status: StatusCodes.NOT_FOUND, message: "Error creating user" });
            }
            return res.status(StatusCodes.OK).json(newUser);
        } catch (err) {
            next(err);
        }
    };

    async updateUser(req: Request<{ uuid: string }>, res: Response, next: NextFunction) {
        try {
            const { uuid } = req.params;
            const { username, password } = req.body;
            const updateUser = await usersRepository.updateUser({ uuid, username, password });
            if (!updateUser) {
                return res.status(StatusCodes.NOT_FOUND).send({ status: StatusCodes.NOT_FOUND, message: "Error updating user" });
            }
            return res.status(StatusCodes.OK).json(updateUser);
        } catch (err) {
            next(err);
        }
    };

    async deleteUser(req: Request<{ uuid: string }>, res: Response, next: NextFunction) {
        try {
            const { uuid } = req.params;
            await usersRepository.deleteUser(uuid);
            return res.status(StatusCodes.OK).send();
        } catch (err) {
            next(err);
        }
    };
};
