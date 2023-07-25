import 'dotenv/config';
import { Server } from './server/index';
import { migrateToLatest } from './migrateToLatest';

// Migrate to latest, doesn't do anything if aöready migrated.
migrateToLatest();

const port = parseInt(process.env.PORT) || 3000;

console.log(process.env);

console.log(`Running at http://localhost:${port}`);

export default {
  port,
  fetch: Server.getInstance().getServer().fetch,
};
