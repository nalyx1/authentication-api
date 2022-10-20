import { Pool } from "pg";
import databaseConfig from "./config/databaseConfig";

const connectionString = databaseConfig.connectionString;
const db = new Pool({ connectionString });

export default db;
