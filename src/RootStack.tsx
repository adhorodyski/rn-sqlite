import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ChatScreen} from './ChatScreen';
import {HomeScreen} from './HomeScreen';
import {SettingsScreen} from './SettingsScreen';

export type RootStackParamList = {
  Home: undefined;
  Chat: {chatId: number};
  Settings: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootStack = () => (
  <Stack.Navigator initialRouteName="Home">
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen name="Chat" component={ChatScreen} />
    <Stack.Screen name="Settings" component={SettingsScreen} />
  </Stack.Navigator>
);
