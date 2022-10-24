import express from "express";
import errorHandler from "./middlewares/errorHandler.middleware";
import jwtAuthentication from "./middlewares/jwtAuthentication.middleware";
import authenticationRoute from "./routes/authentication.route";
import usersRoute from "./routes/users.route";

const server = express();
const port = 5000;

// config da aplicação
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

// config das rotas
server.use(authenticationRoute);
server.use(jwtAuthentication);
server.use(usersRoute);
// config dos handlers de erro
server.use(errorHandler);

// inicialização do servidor
server.listen(process.env.PORT || port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
