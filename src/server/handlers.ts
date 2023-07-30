import { Hono, Context } from 'hono';

import { httpRequestTimer } from '../prometheus';
import { PostRepository } from '../repository/post-repository';
import { CommentRepository } from '../repository/comment-repository';
import { SpeciesRepository } from '../repository/species-repository';

export const speciesHandler = async (c) => {
  const res = await SpeciesRepository.getInstance().getSpecieses();
  return c.json(res);
};

export const postByIdHandler = async (c: Context) => {
  const start = performance.now();

  const id = c.req.param('id');
  const res = await PostRepository.getInstance().findPostById(parseInt(id));
  const responseTimeInMs = performance.now() - start;
  httpRequestTimer.labels(c.req.method, c.req.url, c.res.status.toString()).observe(responseTimeInMs);
  return c.json(res);
};
export const postHandler = async (c: Context) => {
  const start = performance.now();
  console.log('postHandler');
  const res = await PostRepository.getInstance().findPosts({});
  // TODO: This should definitely moved to db level join!
  const resPosts: Array<{ name: string; comments: { name: string; species: string }[] }> = [];
  // We go thru each of the posts and only pass the attributes we need.
  /*for (const post of res) {
    const tmpComments = await CommentRepository.getInstance().findComments({ owner_id: post.id });
    resPosts.push({
      name: post.first_name + ' ' + post.last_name,
      // The comments data also has to be cleaned up.
      comments: tmpComments.map((p) => {
        return { name: p.name, species: p.species };
      }),
    });
  }
  const responseTimeInMs = performance.now() - start;
  httpRequestTimer.labels(c.req.method, c.req.url, c.res.status.toString()).observe(responseTimeInMs);
  */
  return c.json(res);
};
export const commentsByPostHandler = async (c) => {
  const start = performance.now();
  const id = c.req.param('id');
  const res = await CommentRepository.getInstance().findComments({ post_id: id });
  const responseTimeInMs = performance.now() - start;
  httpRequestTimer.labels(c.req.method, c.req.url, c.res.status.toString()).observe(responseTimeInMs);
  return c.json(res);
};
