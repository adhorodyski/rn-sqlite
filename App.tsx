import {StyleSheet, Text, Platform, SafeAreaView} from 'react-native';
import {QueryClientProvider} from '@tanstack/react-query';
import {queryClient} from './src/lib/queryClient';
import {ChatsList} from './src/ChatsList';

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaView style={styles.container}>
        <Text style={styles.platform}>
          Platform: {Platform.OS} (
          {Platform.OS === 'web' ? 'IndexedDB' : 'SQLite'})
        </Text>

        <ChatsList />
      </SafeAreaView>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  platform: {
    marginBottom: 32,
    fontWeight: 'bold',
  },
});
