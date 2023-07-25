import { personHandler, petsByOwnerHandler, speciesHandler, personPetsHandler } from './handlers';

export const initializeRoutes = (server) => {
  server.get('/species', speciesHandler);
  server.get('/person/:id', personHandler);
  server.get('/person/pets/', personPetsHandler);

  server.get('/pet/owner/:id', petsByOwnerHandler);
};
