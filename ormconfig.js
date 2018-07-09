module.exports = {
  type: process.env.DB_CONNECTION,
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  logging: process.env.DB_LOGGING,
  synchronize: false,
  entities: ['src/db/entities/*.ts'],
  migrations: ['src/db/migrations/*.ts'],
  cli: {
    entitiesDir: 'src/db/entities',
    migrationsDir: 'src/db/migrations'
  }
};
