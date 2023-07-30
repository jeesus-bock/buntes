import { Hono } from 'hono';
import { etag } from 'hono/etag';
import { logger } from 'hono/logger';
import { ServeStaticOptions, serveStatic } from '@hono/node-server/serve-static';
import { initializeRoutes } from './router';
import { initPrometheus } from '../prometheus';
export class Server {
  private static instance?: Server = undefined;
  private server: Hono;
  constructor() {
    this.server = new Hono();
    this.server.use('/favicon.ico', serveStatic({ path: './public/favicon.ico' }));
    this.server.use('*', etag(), logger());
    initializeRoutes(this.server);
    initPrometheus(this.server);
    let serveOps: ServeStaticOptions = { root: './public', rewriteRequestPath: (path) => path.replace(/^\/persons/, '/') };
    this.server.use('/*', serveStatic(serveOps));
  }

  public static getInstance(): Server {
    if (!this.instance) {
      this.instance = new Server();
    }
    return this.instance;
  }
  public getServer() {
    return this.server;
  }
}
