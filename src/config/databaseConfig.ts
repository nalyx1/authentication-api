import "dotenv/config";

export default {
  connectionString: process.env.POSTGRE_CONNECTION_STRING as string,
};
