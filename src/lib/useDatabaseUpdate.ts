import {useEffect} from 'react';
import {db, type Row} from './db.native';

export const useDatabaseUpdate = (keys: string[], callback: () => void) => {
  useEffect(() => {
    db.updateHook(({row = {}}) => {
      /*
      Bail out early if the updated value does not match against any of the keys we care about

      TODOs:
      - the implementation can be extracted to any function that decides whether a row should pass or not
      */
      if (!keys.some(key => (row as Row).key.startsWith(key))) {
        return;
      }

      callback();
    });
  }, [keys, callback]);
};
