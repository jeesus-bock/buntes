import { sql } from 'kysely';
import { db } from '../database';
import { PersonUpdate, Person, NewPerson } from '../types';
import { jsonArrayFrom } from 'kysely/helpers/postgres';

export class PersonRepository {
  private static instance?: PersonRepository = undefined;

  constructor() {}

  public static getInstance(): PersonRepository {
    if (!this.instance) {
      this.instance = new PersonRepository();
    }
    return this.instance;
  }
  public async findPersonById(id: number) {
    return await db.selectFrom('person').where('id', '=', id).selectAll().executeTakeFirst();
  }

  public async findPersons(criteria: Partial<Person>) {
    let query = db.selectFrom('person');

    if (criteria.id) {
      query = query.where('id', '=', criteria.id); // Kysely is immutable, you must re-assign!
    }

    if (criteria.first_name) {
      query = query.where('first_name', '=', criteria.first_name);
    }

    if (criteria.last_name !== undefined) {
      query = query.where('last_name', criteria.last_name === null ? 'is' : '=', criteria.last_name);
    }

    if (criteria.gender) {
      query = query.where('gender', '=', criteria.gender);
    }

    if (criteria.created_at) {
      query = query.where('created_at', '=', criteria.created_at);
    }

    return await query
      .select((eb) => [
        eb.fn('concat', ['first_name', sql`' '`, 'last_name']).as('name'),
        jsonArrayFrom(
          eb
            .selectFrom('pet')
            .innerJoin('species', 'species.id', 'pet.species_id')
            .select(['pet.name', 'species.name as species'])
            .whereRef('pet.owner_id', '=', 'person.id')
            .orderBy('pet.name')
        ).as('pets'),
      ])
      .execute();
  }
  public updatePerson(id: number, updateWith: PersonUpdate) {
    return db.updateTable('person').set(updateWith).where('id', '=', id).execute();
  }

  public createPerson(person: NewPerson) {
    return db.insertInto('person').values(person).returningAll().executeTakeFirstOrThrow();
  }

  public async deletePerson(id: number) {
    return await db.deleteFrom('person').where('id', '=', id).returningAll().executeTakeFirst();
  }
}
