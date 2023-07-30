import { use } from 'chai';
import { Post, Comment, Species, User } from '../../types';
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

export const insertUsers = async (db) => {
  const idArr: Array<number> = [];
  const userArr: Array<Partial<User>> = [
    { user_name: 'MasteOfUniverse' },
    { user_name: 'Catnip' },
    { user_name: 'TurtleBeach' },
    { user_name: 'BunnyHopper' },
    { user_name: 'HamsterMan' },
    { user_name: 'SnakeEyes' },
  ];
  for (const user of userArr) {
    const { id } = await db.insertInto('user').values(user).returningAll().executeTakeFirstOrThrow();
    idArr.push(id);
  }
  return idArr;
};

export const insertPosts = async (db, userIds: number[]) => {
  const idArr: Array<number> = [];
  for (let i = 0; i < 100; i++) {
    const post = { content: faker.music.songName(), user_id: userIds[Math.floor(Math.random() * userIds.length)] } as Partial<Post>;
    const { id } = await db.insertInto('post').values(post).returningAll().executeTakeFirstOrThrow();
    idArr.push(id);
  }
  return idArr;
};

export const insertComments = async (db, postIds: Array<number>, speciesIds: Array<number>, userIds: number[]) => {
  let commentIds = [];
  for (let i = 0; i < 100; i++) {
    let parent_comment_id = null;
    if (Math.round(Math.random())) {
      parent_comment_id = commentIds[Math.floor(Math.random() * commentIds.length)];
    }
    const comment = {
      content: faker.music.genre(),
      user_id: userIds[Math.floor(Math.random() * userIds.length)],
      post_id: postIds[Math.floor(Math.random() * postIds.length)],
      parent_comment_id: parent_comment_id,
      species_id: speciesIds[Math.floor(Math.random() * speciesIds.length)],
    } as Partial<Comment>;
    const { id } = await db.insertInto('comment').values(comment).returningAll().executeTakeFirstOrThrow();
    commentIds.push(id);
  }
};
