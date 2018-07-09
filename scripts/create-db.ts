import { createConnection } from 'mysql';
import * as dotenv from 'dotenv';

dotenv.config();

const modeArg = (process.argv.length > 2) ? process.argv[2] : 'create';
const mode = (modeArg === 'drop') ? 'drop' : 'create';

const LOG_TAG = "[create-database]";

const config = {
  host: process.env.DB_HOST || 'localhost',
  port: (process.env.DB_PORT) ?  +process.env.DB_PORT : 3306,
  database: process.env.DB_DATABASE || 'mysql',
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_ROOT_PASSWORD || '',
  root: process.env.DB_ROOT_USERNAME || 'root',
};

const connectionConfig = {
  host: config.host,
  port: config.port,
  user: config.root,
  password: config.password
};
console.log(LOG_TAG, 'Connecting with:', connectionConfig);

const connection = createConnection(connectionConfig);
new Promise(r => connection.connect(r))
  .then((err) => {
    if (err) throw err;
    console.log(LOG_TAG, 'Connected.');
    console.log(LOG_TAG, `${(mode === 'drop') ? 'Dropping' : 'Creating'} database...`)
    return new Promise(r => connection.query(`${(mode === 'drop') ? 'DROP' : 'CREATE'} DATABASE ${config.database}`, r))
      .then((err) => {
        if (err) throw err;
      })
      .then(() => console.log(LOG_TAG, `Database ${config.database} ${(mode === 'drop') ? 'dropped' : 'created'}!`))
      .catch((_err) => console.log(LOG_TAG, `Database ${config.database} already ${(mode === 'drop') ? 'dropped' : 'created'}!`))
      .then(() => {
        console.log(`GRANT ALL PRIVILEGES ON ${config.database}.* TO '${config.username}'@'%';`);
        return new Promise(r => connection.query(`GRANT ALL PRIVILEGES ON ${config.database}.* TO '${config.username}'@'%';`, r))
        .then((err) => {
          if (err) throw err;
        })
      })
  })
  .then(() => process.exit(0))
  .catch((err) => {
    console.log(LOG_TAG, err);
    process.exit(1);
  });
