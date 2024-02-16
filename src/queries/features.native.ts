import {db} from '../lib/db.native';
import {FeatureConfig} from '../lib/types';

export const getFeaturesConfig = async () => {
  const response = await db.executeAsync('SELECT * FROM features');

  return response.rows?._array as FeatureConfig[];
};
