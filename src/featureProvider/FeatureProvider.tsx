import {useQuery} from '@tanstack/react-query';
import React, {createContext} from 'react';
import {featuresKeys} from '../lib/keys';
import {FeatureConfig} from '../lib/types';
import {getFeaturesConfig} from '../queries/features.native';

export type FeatureName = 'chat-list-avatar';

export type FeatureContextType = FeatureConfig[] | undefined;

const FeatureContext = createContext<FeatureContextType>(undefined);

interface FeatureProviderProps {
  children: React.ReactNode;
}

const FeatureProvider = ({children}: FeatureProviderProps) => {
  const features = useQuery({
    queryKey: featuresKeys.all,
    queryFn: getFeaturesConfig,
  });

  return (
    <FeatureContext.Provider value={features?.data}>
      {children}
    </FeatureContext.Provider>
  );
};

export {FeatureContext, FeatureProvider};
