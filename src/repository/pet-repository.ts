import { db } from '../database';
import { PetUpdate, Pet, NewPet } from '../types';

export class PetRepository {
  private static instance?: PetRepository = undefined;

  constructor() {}

  public static getInstance(): PetRepository {
    if (!this.instance) {
      this.instance = new PetRepository();
    }
    return this.instance;
  }
  public async findPetById(id: number) {
    return await db.selectFrom('pet').where('id', '=', id).selectAll().executeTakeFirst();
  }

  public async findPets(criteria: Partial<Pet>) {
    let query = db.selectFrom('pet').innerJoin('species', 'species.id', 'pet.species_id');

    if (criteria.id) {
      query = query.where('id', '=', criteria.id); // Kysely is immutable, you must re-assign!
    }

    if (criteria.owner_id) {
      query = query.where('owner_id', '=', criteria.owner_id);
    }

    if (criteria.name !== undefined) {
      query = query.where('name', criteria.name === null ? 'is' : '=', criteria.name);
    }

    if (criteria.species_id) {
      query = query.where('species_id', '=', criteria.species_id);
    }

    if (criteria.created_at) {
      query = query.where('created_at', '=', criteria.created_at);
    }

    return await query.select(['pet.id', 'pet.name', 'pet.created_at', 'species.name as species', 'pet.owner_id']).execute();
  }

  public async updatePet(id: number, updateWith: PetUpdate) {
    await db.updateTable('pet').set(updateWith).where('id', '=', id).execute();
  }

  public async createPet(pet: NewPet) {
    return await db.insertInto('pet').values(pet).returningAll().executeTakeFirstOrThrow();
  }

  public async deletePet(id: number) {
    return await db.deleteFrom('pet').where('id', '=', id).returningAll().executeTakeFirst();
  }
}
