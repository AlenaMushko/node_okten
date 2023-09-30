import { config } from "dotenv";

config();

export const configs = {
  DB_URI: process.env.DB_URI,
  TOKEN_SECRET: process.env.TOKEN_SECRET,
  PORT: process.env.PORT,
};
