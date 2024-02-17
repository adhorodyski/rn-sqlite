import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ChatScreen} from './ChatScreen';
import {ChatsScreen} from './ChatsScreen';
import {SettingsScreen} from './SettingsScreen';

export type RootStackParamList = {
  Chats: undefined;
  Chat: {chatId: number};
  Settings: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const Tab = createBottomTabNavigator();

export const HomeStack = () => (
  <Stack.Navigator initialRouteName="Chats">
    <Stack.Screen name="Chats" component={ChatsScreen} />
    <Stack.Screen name="Chat" component={ChatScreen} />
  </Stack.Navigator>
);

export const RootStack = () => (
  <Tab.Navigator
    initialRouteName="Home"
    // TODO: import this from another module to hide it
    detachInactiveScreens={false}>
    <Tab.Screen
      name="Home"
      component={HomeStack}
      options={{headerShown: false}}
    />
    <Tab.Screen name="Settings" component={SettingsScreen} />
  </Tab.Navigator>
);
