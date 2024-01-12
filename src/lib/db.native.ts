import {faker} from '@faker-js/faker';
import {open} from '@op-engineering/op-sqlite';

export const db = open({name: 'op-sqlite', location: ':memory:'});

db.executeBatch([
  ['CREATE TABLE IF NOT EXISTS chats (id INTEGER PRIMARY KEY, title TEXT)'],
  [
    'CREATE TABLE IF NOT EXISTS messages (id INTEGER PRIMARY KEY, chat_id INTEGER, content TEXT)',
  ],
]);

let insertions: [string, any[]][] = [];

const MAX_CHATS = 20;
const MAX_MESSAGES = 2000;

/**
 * This seeds the database with <MAX_CHATS> chats and <MAX_MESSAGES> messages per chat.
 */
for (let i = 0; i < MAX_CHATS; i++) {
  insertions.push([
    'INSERT INTO chats (title) VALUES (?)',
    ['#' + faker.lorem.word()],
  ]);

  for (let y = 0; y < MAX_MESSAGES; y++) {
    insertions.push([
      'INSERT INTO messages (chat_id, content) VALUES (?, ?)',
      [i, faker.lorem.sentence()],
    ]);
  }
}

const res = db.executeBatch(insertions);
console.log(`Seeded ${res.rowsAffected} rows`);
