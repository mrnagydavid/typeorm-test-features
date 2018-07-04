import { createConnection } from 'mysql';

const LOG_TAG = "[create-database]";

const config = {
  username: process.env.TYPEORM_ROOT_USERNAME,
  host: process.env.TYPEORM_HOST,
  port: process.env.TYPEORM_HOST,
  password: process.env.TYPEORM_ROOT_PASSWORD,
  database: process.env.TYPEORM_DATABASE
};

const connection = createConnection({
  host: config.host,
  port: config.port,
  username: config.username,
  password: config.password
});

new Promise(r => connection.connect(r))
  .then((err) => {
    if (err) throw err;
    return new Promise(r => connection.query(`CREATE DATABASE ${config.database}`, r))
      .then((err) => {
        if (err) throw err;
      })
      .then(() => console.log(LOG_TAG, `Database ${config.database} created!`))
      .catch((_err) => console.log(LOG_TAG, `Database ${config.database} already exists!`))
      .then(() => new Promise(r => connection.query(`GRANT ALL PRIVILEGES ON ${config.database}.* TO '${config.username}'@'%';`, r))
        .then((err) => {
          if (err) throw err;
        }))
  })
  .then(() => process.exit(0))
  .catch((err) => {
    console.log(LOG_TAG, err);
    process.exit(1);
  });
