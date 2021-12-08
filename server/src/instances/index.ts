import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

// export const sequelize = new Sequelize(
//   process.env.PG_DB as string,
//   process.env.PG_USER as string,
//   process.env.PG_PASSWORD as string,
//   {
//     dialect: 'postgres',
//     port: +(process.env.PG_PORT as string)
//   }
// );

export const sequelize = new Sequelize(
  "postgres://qsqhpheyxyrnrr:cc5f2a6dfb70a4f948e0efea216efd0f05a0f4352a256fdbd2a28ce8c50d458d@ec2-35-171-90-188.compute-1.amazonaws.com:5432/dan6jonjkdn2mu",
  {
    dialect: 'postgres',
    port: +(process.env.PG_PORT as string)
  }
);