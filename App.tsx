import {NavigationContainer} from '@react-navigation/native';
import {QueryClientProvider} from '@tanstack/react-query';
import {Suspense} from 'react';
import {Loader} from './src/Loader';
import {RootStack} from './src/RootStack';
import {FeatureProvider} from './src/lib/featureProvider/FeatureProvider';
import {queryClient} from './src/lib/queryClient';

export default function App() {
  return (
    <NavigationContainer>
      <QueryClientProvider client={queryClient}>
        <FeatureProvider>
          <Suspense fallback={<Loader />}>
            <RootStack />
          </Suspense>
        </FeatureProvider>
      </QueryClientProvider>
    </NavigationContainer>
  );
}
