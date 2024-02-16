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
  [
    'CREATE TABLE IF NOT EXISTS features (id INTEGER PRIMARY KEY, name TEXT, is_enabled INTEGER)',
  ],
  // create indexes
  ['CREATE INDEX IF NOT EXISTS idx_messages_chat_id ON messages (chat_id)'],
  ['CREATE INDEX IF NOT EXISTS idx_messages_author_id ON messages (author_id)'],
]);

let insertions: [string, any[]][] = [];

const MAX_USERS = 100;
const MAX_CHATS = 500;
const MAX_MESSAGES = 48;
const MAX_FEATURES = 48;

/**
 * This seeds the database with <MAX_USERS> users.
 */
for (let i = 0; i < MAX_USERS; i++) {
  insertions.push([
    'INSERT INTO users (name, email) VALUES (?, ?)',
    [faker.person.fullName(), faker.internet.email()],
  ]);
}

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
      'INSERT INTO messages (chat_id, content, author_id) VALUES (?, ?, ?)',
      [i, faker.lorem.sentence(), i],
    ]);
  }
}

/**
 * This seeds the database with <MAX_FEATURES> features.
 */
const getFeatureName = (index: number) => {
  switch (index) {
    case 0:
      return 'chat-list-avatar';
    default:
      return faker.commerce.product().toLowerCase();
  }
};

for (let i = 0; i < MAX_FEATURES; i++) {
  insertions.push([
    'INSERT INTO features (name, is_enabled) VALUES (?, ?)',
    [getFeatureName(i), 1],
  ]);
}

const res = db.executeBatch(insertions);
console.log(
  `SQLite seeded with ${res.rowsAffected} rows: 
  - ${MAX_USERS} users, 
  - ${MAX_CHATS} chats,
  - ${MAX_CHATS * MAX_MESSAGES} messages
  - ${MAX_FEATURES} features`,
);
