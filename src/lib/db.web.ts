import {faker} from '@faker-js/faker';
import Dexie from 'dexie';

class Database extends Dexie {
  kv!: Dexie.Table<unknown, string>;

  constructor() {
    super('MyAppDatabase');
    this.version(1).stores({kv: ''});
  }
}

export const db = new Database();

const MAX_USERS = 100;
const MAX_CHATS = 100;
const MAX_MESSAGES = 100;

let insertions: [string, any][] = [];

/**
 * This seeds the database with <MAX_USERS> users.
 */
for (let i = 0; i < MAX_USERS; i++) {
  insertions.push([
    `user_${i}`,
    {
      id: i,
      name: faker.person.fullName(),
      email: faker.internet.email(),
    },
  ]);
}

insertions.push(['betas', ['feature_1', 'feature_2']]);

/**
 * This seeds the database with <MAX_CHATS> chats and <MAX_MESSAGES> messages per chat.
 */
for (let i = 0; i < MAX_CHATS; i++) {
  insertions.push([`chat_${i}`, {id: i, title: '#' + faker.lorem.word()}]);
}

for (let y = 0; y < MAX_MESSAGES; y++) {
  insertions.push([
    `message_${y}`,
    {
      id: y,
      chat_id: y,
      content: faker.lorem.sentence(),
      created_at: Date.now(),
      author_id: y,
    },
  ]);
}

const keys = insertions.map(([key]) => key);
const values = insertions.map(([, value]) => value);

db.kv
  .bulkPut(values, keys, {allKeys: true})
  .then(keys => {
    console.log(
      `IndexedDB seeded with ${keys.length} keys:
        - ${MAX_USERS} users,
        - ${MAX_CHATS} chats,
        - ${MAX_MESSAGES} messages`,
    );
  })
  .catch(error => {
    console.error('Error seeding IndexedDB:', error);
  });
