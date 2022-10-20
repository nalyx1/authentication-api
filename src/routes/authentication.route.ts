import { Router } from "express";
import { AuthenticationController } from "../controllers/authentication.controller";
import basicAuthentication from "../middlewares/basicAuthentication.middleware";
import jwtAuthentication from "../middlewares/jwtAuthentication.middleware";

const authenticationRoute = Router();
const authenticationController = new AuthenticationController();

authenticationRoute.post("/token", basicAuthentication, authenticationController.getToken);
authenticationRoute.post("/token/validate", jwtAuthentication, authenticationController.validateToken);

export default authenticationRoute;
