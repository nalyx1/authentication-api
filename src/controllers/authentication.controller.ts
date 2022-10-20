import { StatusCodes } from "http-status-codes";
import { Request, Response, NextFunction } from "express";
import auth from "../config/auth";
import JWT from "jsonwebtoken";

export class AuthenticationController {
  getToken(req: Request, res: Response, next: NextFunction) {
    try {
      const user = req.user;
      const jwtPaylod = { username: user?.username };
      const jwtSecret = auth.secret;
      const jwtOptions = { subject: user?.uuid, expiresIn: auth.expiresIn };

      const jwt = JWT.sign(jwtPaylod, jwtSecret, jwtOptions);
      res.status(StatusCodes.OK).json({
        token: jwt,
      });
    } catch (err) {
      next(err);
    }
  }

  validateToken(req: Request, res: Response, next: NextFunction) {
    try {
      res.sendStatus(StatusCodes.OK);
    } catch (err) {
      next(err);
    }
  }
}
