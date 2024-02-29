import {useEffect} from 'react';
import {db, type Row} from './db.native';

export const useDatabaseSync = (callback: () => void, keys: string[]) => {
  useEffect(() => {
    db.updateHook(({row = {}}) => {
      if (!keys.some(key => (row as Row).key.startsWith(key))) {
        return;
      }

      callback();
    });
  }, [callback, keys]);
};
