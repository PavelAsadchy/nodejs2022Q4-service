import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceConfig = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: +process.env.POSTGRES_PORT,
  database: process.env.POSTGRES_DB,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  synchronize: false,
  logging: false,
  entities: ['/dist/**/entities/*.entity.js'], // [User, Board, BoardColumn, Task],
  migrationsRun: true,
  migrations: ['src/migrations/**/*.ts'],
  cli: {
    entitiesDir: 'src/entities/**/*.ts',
    migrationsDir: 'src/migrations/**/*.ts',
  },
} as DataSourceOptions;

// const datasource = new DataSource(dataSourceConfig);

// datasource
//   .initialize()
//   .then(() => {
//     console.log('Data Source has been initialized!');
//   })
//   .catch((err) => {
//     console.error('Error during Data Source initialization', err);
//   });

// export default datasource;
