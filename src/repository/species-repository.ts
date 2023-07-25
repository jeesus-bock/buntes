import { db } from '../database';
import { SpeciesUpdate, Species, NewSpecies } from '../types';

export class SpeciesRepository {
  private static instance?: SpeciesRepository = undefined;

  constructor() {}

  public static getInstance(): SpeciesRepository {
    if (!this.instance) {
      this.instance = new SpeciesRepository();
    }
    return this.instance;
  }
  public async findSpeciesById(id: number) {
    return await db.selectFrom('species').where('id', '=', id).selectAll().executeTakeFirst();
  }

  public async getSpecieses() {
    return db.selectFrom('species').selectAll().execute();
  }
  public async updateSpecies(id: number, updateWith: SpeciesUpdate) {
    return db.updateTable('species').set(updateWith).where('id', '=', id).execute();
  }

  public async createSpecies(species: NewSpecies) {
    return await db.insertInto('species').values(species).returningAll().executeTakeFirstOrThrow();
  }

  public async deleteSpecies(id: number) {
    return await db.deleteFrom('species').where('id', '=', id).returningAll().executeTakeFirst();
  }
}
