import {open} from '@op-engineering/op-sqlite';

export const db = open({name: 'op-sqlite', location: ':memory:'});

db.executeBatch([
  ['CREATE TABLE IF NOT EXISTS chats (id INTEGER PRIMARY KEY, title TEXT)'],
  [
    'CREATE TABLE IF NOT EXISTS messages (id INTEGER PRIMARY KEY, chatId INTEGER, content TEXT)',
  ],
]);

db.executeBatch([
  ['INSERT INTO chats (title) VALUES (?)', ['#hello']],
  ['INSERT INTO chats (title) VALUES (?)', ['#test']],
  ['INSERT INTO chats (title) VALUES (?)', ['#test2']],
  ['INSERT INTO chats (title) VALUES (?)', ['#test3']],
  ['INSERT INTO chats (title) VALUES (?)', ['#admins']],
  ['INSERT INTO chats (title) VALUES (?)', ['#common']],
  ['INSERT INTO chats (title) VALUES (?)', ['#room']],
  ['INSERT INTO chats (title) VALUES (?)', ['#train-goes-choo-choo']],
  ['INSERT INTO messages (chatId, content) VALUES (?, ?)', [1, 'Hello world!']],
]);
