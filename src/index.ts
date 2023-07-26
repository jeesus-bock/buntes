import 'dotenv/config';
import { Server } from './server/index';
import { migrateToLatest } from './migrateToLatest';
import { initPrometheus } from './prometheus';

// Migrate to latest, doesn't do anything if aöready migrated.
// This is suboptimal way.
migrateToLatest();

const port = parseInt(process.env.PORT) || 3000;

console.log(process.env);

const server = Server.getInstance().getServer();

console.log(`Running at http://localhost:${port}`);
export default {
  port,
  fetch: server.fetch,
};
