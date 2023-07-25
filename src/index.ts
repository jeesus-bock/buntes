import 'dotenv/config';
import { Server } from './server/index';

const port = parseInt(process.env.PORT) || 3000;

console.log(`Running at http://localhost:${port}`);

export default {
  port,
  fetch: Server.getInstance().getServer().fetch,
};
