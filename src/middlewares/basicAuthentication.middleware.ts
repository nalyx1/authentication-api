import { Request, Response, NextFunction } from "express";
import AuthenticationError from "../models/errors/authenticationError.model";
import UsersRepository from "../repositories/users.repository";

const usersRepository = new UsersRepository();

async function basicAuthentication(req: Request, res: Response, next: NextFunction) {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      throw new AuthenticationError("Credencial não informada");
    }

    const [authType, token] = authorization.split(" ");
    if (authType !== "Basic" || !token) {
      throw new AuthenticationError("Tipo de autenticação inválido");
    }

    const tokenContent = Buffer.from(token, "base64").toString("utf-8");
    const [username, password] = tokenContent.split(":");
    if (!username || !password) {
      throw new AuthenticationError("Credencial não preenchida");
    }

    const user = await usersRepository.findByUsernameAndPassword(username, password);
    if (!user) {
      throw new AuthenticationError("Usuário ou senha inválidos!");
    }

    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
}

export default basicAuthentication;
