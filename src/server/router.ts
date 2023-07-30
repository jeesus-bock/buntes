import { Hono } from 'hono';
import { postHandler, postByIdHandler, commentsByPostHandler, speciesHandler } from './handlers';

export const initializeRoutes = (server: Hono) => {
  server.get('/species', speciesHandler);
  server.get('/post/:id', postByIdHandler);
  server.get('/post', postHandler);
  server.get('/comment/post/:id', commentsByPostHandler);
};
