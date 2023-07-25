import { SpeciesRepository } from '../repository/species-repository';

export const initializeRoutes = (server) => {
  server.get('/species', async (c) => {
    const res = await SpeciesRepository.getInstance().getSpecieses();
    return c.json(res);
  });
};
