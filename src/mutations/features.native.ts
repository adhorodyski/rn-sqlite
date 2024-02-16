import {db} from '../lib/db.native';

interface Props {
  featureName: string;
  isEnabled: number;
}

export const updateFeature = ({featureName, isEnabled}: Props) => {
  return db.executeAsync(
    `UPDATE features SET is_enabled = ${isEnabled} WHERE name = "${featureName}"`,
    [isEnabled, featureName],
  );
};
