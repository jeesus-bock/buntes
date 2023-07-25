import { PersonRepository } from '../repository/person-repository';
import { PetRepository } from '../repository/pet-repository';
import { SpeciesRepository } from '../repository/species-repository';

export const speciesHandler = async (c) => {
  const res = await SpeciesRepository.getInstance().getSpecieses();
  return c.json(res);
};

export const personByIdHandler = async (c) => {
  const id = c.req.param('id');
  const res = await PersonRepository.getInstance().findPersonById(id);
  return c.json(res);
};
export const personHandler = async (c) => {
  const res = await PersonRepository.getInstance().findPersons({});
  // TODO: This should definitely moved to db level join!
  const resPersons: Array<any> = [];
  for (const person of res) {
    const tmpPets = await PetRepository.getInstance().findPets({ owner_id: person.id });
    resPersons.push({ ...person, pets: tmpPets });
  }
  return c.json(resPersons);
};
export const petsByOwnerHandler = async (c) => {
  const id = c.req.param('id');
  const res = await PetRepository.getInstance().findPets({ owner_id: id });
  return c.json(res);
};
