import {NavigationContainer} from '@react-navigation/native';
import {QueryClientProvider} from '@tanstack/react-query';
import {queryClient} from './src/lib/queryClient';
import {RootStack} from './src/RootStack';

export default function App() {
  return (
    <NavigationContainer>
      <QueryClientProvider client={queryClient}>
        <RootStack />
      </QueryClientProvider>
    </NavigationContainer>
  );
}
