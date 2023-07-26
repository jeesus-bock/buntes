import { Hono } from 'hono';
import { personHandler, personByIdHandler, petsByOwnerHandler, speciesHandler } from './handlers';

export const initializeRoutes = (server: Hono) => {
  server.get('/species', speciesHandler);
  server.get('/person/:id', personByIdHandler);
  server.get('/person', personHandler);
  server.get('/pet/owner/:id', petsByOwnerHandler);
};
