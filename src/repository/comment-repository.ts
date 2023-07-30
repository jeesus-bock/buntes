import { db } from '../database';
import { CommentUpdate, Comment, NewComment } from '../types';

export class CommentRepository {
  private static instance?: CommentRepository = undefined;

  constructor() {}

  public static getInstance(): CommentRepository {
    if (!this.instance) {
      this.instance = new CommentRepository();
    }
    return this.instance;
  }
  public async findCommentById(id: number) {
    return await db.selectFrom('comment').where('id', '=', id).selectAll().executeTakeFirst();
  }

  public async findComments(criteria: Partial<Comment>) {
    let query = db.selectFrom('comment').innerJoin('species', 'species.id', 'comment.species_id');

    if (criteria.id) {
      query = query.where('id', '=', criteria.id); // Kysely is immutable, you must re-assign!
    }

    if (criteria.post_id) {
      query = query.where('post_id', '=', criteria.post_id);
    }

    if (criteria.species_id) {
      query = query.where('species_id', '=', criteria.species_id);
    }

    if (criteria.created_at) {
      query = query.where('created_at', '=', criteria.created_at);
    }

    return await query.select(['comment.id', 'comment.content', 'comment.created_at', 'species.name as species', 'comment.post_id', 'comment.parent_comment_id']).execute();
  }

  public async updateComment(id: number, updateWith: CommentUpdate) {
    await db.updateTable('comment').set(updateWith).where('id', '=', id).execute();
  }

  public async createComment(comment: NewComment) {
    return await db.insertInto('comment').values(comment).returningAll().executeTakeFirstOrThrow();
  }

  public async deleteComment(id: number) {
    return await db.deleteFrom('comment').where('id', '=', id).returningAll().executeTakeFirst();
  }
}
