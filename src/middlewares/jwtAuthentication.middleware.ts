import { Request, Response, NextFunction } from "express";
import AuthenticationError from "../models/errors/authenticationError.model";
import auth from "../config/auth";
import JWT from "jsonwebtoken";

async function jwtAuthentication(req: Request, res: Response, next: NextFunction) {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      throw new AuthenticationError("Credencial não informada");
    }

    const [authType, token] = authorization.split(" ");
    if (authType !== "Bearer" || !token) {
      throw new AuthenticationError("Tipo de autenticação inválido");
    }

    try {
      const tokenPayload = JWT.verify(token, auth.secret);
      if (typeof tokenPayload !== "object" || !tokenPayload.sub) {
        throw new AuthenticationError("Token inválido");
      }

      const user = {
        uuid: tokenPayload.sub,
        username: tokenPayload.username,
      };
      req.user = user;
      next();
    } catch (err) {
      throw new AuthenticationError("Token inválido");
    }
  } catch (err) {
    next(err);
  }
}

export default jwtAuthentication;
