import { Hono } from 'hono';
import { etag } from 'hono/etag';
import { logger } from 'hono/logger';
import { serveStatic } from 'hono/serve-static.bun';
import { initializeRoutes } from './router';

export class Server {
  private static instance?: Server = undefined;
  private server: Hono;
  constructor() {
    this.server = new Hono();
    this.server.use('/favicon.ico', serveStatic({ path: './public/favicon.ico' }));
    this.server.use('/*', serveStatic({ root: './public/' }));
    this.server.use('*', etag(), logger());
    initializeRoutes(this.server);
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
