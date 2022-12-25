import { Knex, knex } from "knex";

const config: Knex.Config = {
  client: "mysql2",
  connection: process.env.DATABASE_URL,
  pool: {
    min: 0,
    max: 50,
  },
};

export const knexInstance = knex(config);
