import { Kysely, sql } from 'kysely';
import { Species } from '../types';
import { insertPersons, insertSpecies, insertPets } from './helpers/dbInsertions';

export async function up(db: Kysely<any>): Promise<void> {
  // Drop all the tables while debuging/testing
  /*await db.schema.dropTable('pet').execute();
  await db.schema.dropTable('person').execute();
  await db.schema.dropTable('species').execute();
*/
  // And recreate it
  await db.schema
    .createTable('person')
    .addColumn('id', 'serial', (col) => col.primaryKey())
    .addColumn('first_name', 'varchar', (col) => col.notNull())
    .addColumn('last_name', 'varchar')
    .addColumn('gender', 'varchar(50)', (col) => col.notNull())
    .addColumn('created_at', 'timestamp', (col) => col.defaultTo(sql`now()`).notNull())
    .execute();
  await db.schema
    .createTable('species')
    .addColumn('id', 'serial', (col) => col.primaryKey())
    .addColumn('name', 'varchar', (col) => col.notNull().unique())
    .execute();
  await db.schema
    .createTable('pet')
    .addColumn('id', 'serial', (col) => col.primaryKey())
    .addColumn('name', 'varchar', (col) => col.notNull())
    .addColumn('owner_id', 'integer', (col) => col.references('person.id').onDelete('cascade').notNull())
    .addColumn('species_id', 'integer', (col) => col.references('species.id').notNull())
    .addColumn('created_at', 'timestamp', (col) => col.defaultTo(sql`now()`).notNull())
    .execute();

  await db.schema.createIndex('pet_owner_id_index').on('pet').column('owner_id').execute();
  await db.schema.createIndex('pet_species_id_index').on('pet').column('species_id').execute();
  const speciesIds = await insertSpecies(db);
  const personIds = await insertPersons(db);
  await insertPets(db, personIds, speciesIds);
}

export async function down(db: Kysely<any>): Promise<void> {
  /*await db.schema.dropTable('pet').execute();
  await db.schema.dropTable('person').execute();
  await db.schema.dropTable('species').execute();*/
}
