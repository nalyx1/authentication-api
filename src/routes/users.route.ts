import { Router } from "express";
import { UsersController } from "../controllers/users.controller";

const usersRoute = Router();
const usersController = new UsersController();

usersRoute.get("/users", usersController.getAllUsers);
usersRoute.get("/users/:uuid", usersController.getUniqueUser);
usersRoute.post("/users", usersController.createUser);
usersRoute.put("/users/:uuid", usersController.updateUser);
usersRoute.delete("/users/:uuid", usersController.deleteUser);

export default usersRoute;
