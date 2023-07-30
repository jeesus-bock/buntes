import { Kysely, sql } from 'kysely';
import { Species } from '../types';
import { insertPosts, insertSpecies, insertComments, insertUsers } from './helpers/dbInsertions';

export async function up(db: Kysely<any>): Promise<void> {
  // Drop all the tables while debuging/testing
  /*await db.schema.dropTable('comment').execute();
  await db.schema.dropTable('post').execute();
  await db.schema.dropTable('species').execute();
*/
  // And recreate it
  await db.schema
    .createTable('user')
    .addColumn('id', 'serial', (col) => col.primaryKey())
    .addColumn('user_name', 'varchar', (col) => col.notNull().unique())
    .execute();
  await db.schema
    .createTable('post')
    .addColumn('id', 'serial', (col) => col.primaryKey())
    .addColumn('content', 'varchar', (col) => col.notNull())
    .addColumn('user_id', 'integer', (col) => col.references('user.id'))
    .addColumn('created_at', 'timestamp', (col) => col.defaultTo(sql`now()`).notNull())
    .execute();
  await db.schema
    .createTable('species')
    .addColumn('id', 'serial', (col) => col.primaryKey())
    .addColumn('name', 'varchar', (col) => col.notNull().unique())
    .execute();
  await db.schema
    .createTable('comment')
    .addColumn('id', 'serial', (col) => col.primaryKey())
    .addColumn('user_id', 'integer', (col) => col.references('user.id'))
    .addColumn('post_id', 'integer', (col) => col.references('post.id').onDelete('cascade').notNull())
    .addColumn('parent_comment_id', 'integer', (col) => col.references('comment.id'))
    .addColumn('species_id', 'integer', (col) => col.references('species.id').notNull())
    .addColumn('content', 'varchar')
    .addColumn('created_at', 'timestamp', (col) => col.defaultTo(sql`now()`).notNull())
    .execute();

  await db.schema.createIndex('comment_owner_id_index').on('comment').column('post_id').execute();

  const userIds = await insertUsers(db);

  const postIds = await insertPosts(db, userIds);
  const speciesIds = await insertSpecies(db);
  await insertComments(db, postIds, speciesIds, userIds);
}

export async function down(db: Kysely<any>): Promise<void> {
  /*await db.schema.dropTable('comment').execute();
  await db.schema.dropTable('post').execute();
  await db.schema.dropTable('species').execute();*/
}
