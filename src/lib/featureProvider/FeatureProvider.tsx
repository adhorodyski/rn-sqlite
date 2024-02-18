import {useQuery} from '@tanstack/react-query';
import React, {createContext} from 'react';
import {getFeaturesConfig} from '../../queries/features.native';
import {featuresKeys} from '../keys';
import {FeatureConfig} from '../types';

export type FeatureName =
  | 'chat-list-avatar'
  | 'chat-list-action-icons'
  | 'inbox-list-avatar'
  | 'inbox-list-action-icons'
  | 'settings-new-feature'
  | 'new-feature';

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
