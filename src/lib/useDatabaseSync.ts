import {useEffect} from 'react';
import {queue, type Row} from './db.native';

export const useDatabaseSync = (callback: () => void, keys: string[]) => {
  useEffect(() => {
    const unsubscribe = queue.subscribe(({row = {}}) => {
      // TODO offload this to run on  C++ / worklet / native if it turns out to be ~5x faster than Hermes
      if (!keys.some(key => (row as Row).key.startsWith(key))) {
        return;
      }

      callback();
    });

    return () => unsubscribe();
  }, [callback, keys]);
};
