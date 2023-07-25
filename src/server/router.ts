import { personHandler, petsByOwnerHandler, speciesHandler } from './handlers';

export const initializeRoutes = (server) => {
  server.get('/species', speciesHandler);
  server.get('/person/:id', personHandler);
  server.get('/pet/owner/:id', petsByOwnerHandler);
};
