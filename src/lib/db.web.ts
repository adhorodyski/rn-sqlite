import Dexie from 'dexie';

class Database extends Dexie {
  kv!: Dexie.Table<unknown, number>;

  constructor() {
    super('MyAppDatabase');
    this.version(1).stores({kv: ''});
  }
}

export const db = new Database();
