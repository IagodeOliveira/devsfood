import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

export const sequelize = new Sequelize(
  process.env.PG_DB as string,
  process.env.PG_USER as string,
  process.env.PG_PASSWORD as string,
  {
    host: process.env.PG_Host as string,
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    },
    port: +(process.env.PG_PORT as string)
  }
);