import { Hono, Context } from 'hono';

import { httpRequestTimer } from '../prometheus';
import { PersonRepository } from '../repository/person-repository';
import { PetRepository } from '../repository/pet-repository';
import { SpeciesRepository } from '../repository/species-repository';

export const speciesHandler = async (c) => {
  const res = await SpeciesRepository.getInstance().getSpecieses();
  return c.json(res);
};

export const personByIdHandler = async (c: Context) => {
  const start = performance.now();

  const id = c.req.param('id');
  const res = await PersonRepository.getInstance().findPersonById(parseInt(id));
  const responseTimeInMs = performance.now() - start;
  httpRequestTimer.labels(c.req.method, c.req.url, c.res.status.toString()).observe(responseTimeInMs);
  return c.json(res);
};
export const personHandler = async (c: Context) => {
  const start = performance.now();
  console.log('personHandler');
  const res = await PersonRepository.getInstance().findPersons({});
  // TODO: This should definitely moved to db level join!
  const resPersons: Array<{ name: string; pets: { name: string; species: string }[] }> = [];
  // We go thru each of the persons and only pass the attributes we need.
  /*for (const person of res) {
    const tmpPets = await PetRepository.getInstance().findPets({ owner_id: person.id });
    resPersons.push({
      name: person.first_name + ' ' + person.last_name,
      // The pets data also has to be cleaned up.
      pets: tmpPets.map((p) => {
        return { name: p.name, species: p.species };
      }),
    });
  }
  const responseTimeInMs = performance.now() - start;
  httpRequestTimer.labels(c.req.method, c.req.url, c.res.status.toString()).observe(responseTimeInMs);
  */
  return c.json(res);
};
export const petsByOwnerHandler = async (c) => {
  const start = performance.now();
  const id = c.req.param('id');
  const res = await PetRepository.getInstance().findPets({ owner_id: id });
  const responseTimeInMs = performance.now() - start;
  httpRequestTimer.labels(c.req.method, c.req.url, c.res.status.toString()).observe(responseTimeInMs);
  return c.json(res);
};
