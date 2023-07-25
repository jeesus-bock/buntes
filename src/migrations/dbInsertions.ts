import { Species } from '../types';
export const insertSpecies = (db) => {
  const speciesArr: Array<Partial<Species>> = [{ name: 'Dog' }, { name: 'Cat' }, { name: 'Turtle' }, { name: 'Bunny' }, { name: 'Hamster' }, { name: 'Snake' }];
  for (const species of speciesArr) {
    db.insertInto('species').values(species).returningAll().executeTakeFirstOrThrow();
  }
};
