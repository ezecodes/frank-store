import { Sequelize } from "sequelize";
import config from "../config";

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    dialect: "postgres",
    pool: {
      max: 1000,
      min: 0,
      acquire: 60000,
      idle: 10000,
    },
  }
);

export { Sequelize, sequelize };
