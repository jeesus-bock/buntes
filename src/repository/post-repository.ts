import { sql } from 'kysely';
import { db } from '../database';
import { PostUpdate, Post, NewPost } from '../types';
import { jsonArrayFrom } from 'kysely/helpers/postgres';

export class PostRepository {
  private static instance?: PostRepository = undefined;

  constructor() {}

  public static getInstance(): PostRepository {
    if (!this.instance) {
      this.instance = new PostRepository();
    }
    return this.instance;
  }
  public async findPostById(id: number) {
    return await db.selectFrom('post').where('id', '=', id).selectAll().executeTakeFirst();
  }

  public async findPosts(criteria: Partial<Post>) {
    let query = db.selectFrom('post').innerJoin('user', 'user.id', 'post.user_id');

    if (criteria.id) {
      query = query.where('id', '=', criteria.id); // Kysely is immutable, you must re-assign!
    }

    if (criteria.user_id !== undefined) {
      query = query.where('user_id', criteria.user_id === null ? 'is' : '=', criteria.user_id);
    }

    if (criteria.created_at) {
      query = query.where('created_at', '=', criteria.created_at);
    }

    return await query
      .select((eb) => [
        //eb.fn('concat', ['first_name', sql`' '`, 'last_name']).as('name'),
        'content',
        'user.user_name',
        jsonArrayFrom(
          eb
            .selectFrom('comment')
            .innerJoin('species', 'species.id', 'comment.species_id')
            .innerJoin('user', 'user.id', 'comment.user_id')

            .select(['user.user_name', 'comment.content', 'comment.parent_comment_id', 'comment.user_id', 'species.name as species'])
            .whereRef('comment.post_id', '=', 'post.id')
            .orderBy('comment.created_at')
        ).as('comments'),
      ])
      .execute();
  }
  public updatePost(id: number, updateWith: PostUpdate) {
    return db.updateTable('post').set(updateWith).where('id', '=', id).execute();
  }

  public createPost(post: NewPost) {
    return db.insertInto('post').values(post).returningAll().executeTakeFirstOrThrow();
  }

  public async deletePost(id: number) {
    return await db.deleteFrom('post').where('id', '=', id).returningAll().executeTakeFirst();
  }
}
