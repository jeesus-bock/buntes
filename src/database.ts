import { Database } from './types'; // this is the Database interface we defined earlier
import { Pool } from 'pg';
import { Kysely, PostgresDialect } from 'kysely';
const dbOpts = {
  database: process.env.DBNAME,
  host: process.env.DBHOST,
  user: process.env.DBUSER,
  password: process.env.DBPASS,
  port: 5432,
  max: 10,
};
console.log('dbOpts', dbOpts);
const dialect = new PostgresDialect({
  pool: new Pool(dbOpts),
});
console.log('Connected to db ' + dbOpts.database + ' at ' + dbOpts.host + ':' + dbOpts.port);
// Database interface is passed to Kysely's constructor, and from now on, Kysely
// knows your database structure.
// Dialect is passed to Kysely's constructor, and from now on, Kysely knows how
// to communicate with your database.
export const db = new Kysely<Database>({
  dialect,
});
