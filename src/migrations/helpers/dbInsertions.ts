import { Person, Pet, Species } from '../../types';
import { faker } from '@faker-js/faker';
export const insertSpecies = async (db) => {
  const idArr: Array<number> = [];
  const speciesArr: Array<Partial<Species>> = [{ name: 'Dog' }, { name: 'Cat' }, { name: 'Turtle' }, { name: 'Bunny' }, { name: 'Hamster' }, { name: 'Snake' }];
  for (const species of speciesArr) {
    const { id } = await db.insertInto('species').values(species).returningAll().executeTakeFirstOrThrow();
    idArr.push(id);
  }
  return idArr;
};

export const insertPersons = async (db) => {
  const idArr: Array<number> = [];
  for (let i = 0; i < 100; i++) {
    const person = { gender: faker.person.gender(), first_name: faker.person.firstName(), last_name: faker.person.lastName() } as Partial<Person>;
    const { id } = await db.insertInto('person').values(person).returningAll().executeTakeFirstOrThrow();
    idArr.push(id);
  }
  return idArr;
};

export const insertPets = async (db, personIds: Array<number>, speciesIds: Array<number>) => {
  for (let i = 0; i < 100; i++) {
    const pet = {
      name: faker.person.firstName(),
      owner_id: personIds[Math.floor(Math.random() * personIds.length)],
      species_id: speciesIds[Math.floor(Math.random() * speciesIds.length)],
    } as Partial<Pet>;
    const { id } = await db.insertInto('pet').values(pet).returningAll().executeTakeFirstOrThrow();
  }
};
