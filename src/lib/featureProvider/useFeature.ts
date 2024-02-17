import {useContext} from 'react';
import {FeatureContext, FeatureName} from './FeatureProvider';

export const useFeatureToggle = (featureName: FeatureName) => {
  const featureConfig = useContext(FeatureContext);

  const feature = featureConfig?.find(value => value.name === featureName);

  return !!feature?.is_enabled;
};
