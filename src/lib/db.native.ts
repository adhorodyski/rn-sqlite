import {faker} from '@faker-js/faker';
import {open} from '@op-engineering/op-sqlite';

export const db = open({name: 'op-sqlite', location: ':memory:'});

db.executeBatch([
  // create tables
  [
    'CREATE TABLE IF NOT EXISTS kv (key TEXT NOT NULL PRIMARY KEY, value JSON NOT NULL) WITHOUT ROWID',
  ],
  // create indexes
  ["CREATE INDEX IF NOT EXISTS idx_chats ON kv (key) WHERE key LIKE 'chat_%'"],
  [
    "CREATE INDEX IF NOT EXISTS idx_messages ON kv (key) WHERE key LIKE 'message_%'",
  ],
  ["CREATE INDEX IF NOT EXISTS idx_users ON kv (key) WHERE key LIKE 'user_%'"],
]);

let insertions: [string, any[]][] = [];

const MAX_USERS = 150;
const MAX_CHATS = 200;
const MAX_MESSAGES = 48;

/**
 * This seeds the database with <MAX_USERS> users.
 */
for (let i = 0; i < MAX_USERS; i++) {
  insertions.push([
    'INSERT INTO kv (key, value) VALUES (?, ?)',
    [
      `user_${i}`,
      JSON.stringify({
        id: i,
        name: faker.person.fullName(),
        email: faker.internet.email(),
      }),
    ],
  ]);
}

/**
 * This seeds the database with <MAX_CHATS> chats and <MAX_MESSAGES> messages per chat.
 */
for (let i = 0; i < MAX_CHATS; i++) {
  insertions.push([
    'INSERT INTO kv (key, value) VALUES (?, ?)',
    [`chat_${i}`, JSON.stringify({id: i, title: '#' + faker.lorem.word()})],
  ]);
}

for (let y = 0; y < MAX_MESSAGES; y++) {
  insertions.push([
    'INSERT INTO kv (key, value) VALUES (?, ?)',
    [
      `message_${y}`,
      JSON.stringify({
        id: y,
        chat_id: y,
        content: faker.lorem.sentence(),
        created_at: Date.now(),
        author_id: y,
      }),
    ],
  ]);
}

const res = db.executeBatch(insertions);
console.log(
  `SQLite seeded with ${res.rowsAffected} rows:
  - ${MAX_USERS} users,
  - ${MAX_CHATS} chats,
  - ${MAX_MESSAGES} messages`,
);
