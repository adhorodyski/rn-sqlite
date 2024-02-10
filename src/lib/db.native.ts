import {faker} from '@faker-js/faker';
import {open} from '@op-engineering/op-sqlite';

export const db = open({name: 'op-sqlite', location: ':memory:'});

db.executeBatch([
  // create tables
  ['CREATE TABLE IF NOT EXISTS chats (id INTEGER PRIMARY KEY, title TEXT)'],
  [
    'CREATE TABLE IF NOT EXISTS messages (id INTEGER PRIMARY KEY, chat_id INTEGER NOT NULL, content TEXT, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, author_id INTEGER NOT NULL)',
  ],
  [
    'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, name TEXT, email TEXT)',
  ],
  // create indexes
  ['CREATE INDEX IF NOT EXISTS idx_messages_chat_id ON messages (chat_id)'],
  ['CREATE INDEX IF NOT EXISTS idx_messages_author_id ON messages (author_id)'],
]);

let insertions: [string, any[]][] = [];

const MAX_CHATS = 2000;
const MAX_MESSAGES = 48;

/**
 * This seeds the database with <MAX_CHATS> chats and <MAX_MESSAGES> messages per chat.
 */
for (let i = 0; i < MAX_CHATS; i++) {
  insertions.push([
    'INSERT INTO users (name, email) VALUES (?, ?)',
    [faker.person.fullName(), faker.internet.email()],
  ]);

  insertions.push([
    'INSERT INTO chats (title) VALUES (?)',
    ['#' + faker.lorem.word()],
  ]);

  for (let y = 0; y < MAX_MESSAGES; y++) {
    insertions.push([
      'INSERT INTO messages (chat_id, content, author_id) VALUES (?, ?, ?)',
      [i, faker.lorem.sentence(), i],
    ]);
  }
}

const res = db.executeBatch(insertions);
console.log(`Seeded ${res.rowsAffected} rows`);
