import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
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

const Tab = createBottomTabNavigator();

export const HomeStack = () => (
  <Stack.Navigator initialRouteName="Home">
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen name="Chat" component={ChatScreen} />
  </Stack.Navigator>
);

export const RootStack = () => (
  <Tab.Navigator initialRouteName="Home" detachInactiveScreens={false}>
    <Tab.Screen
      name="Home"
      component={HomeStack}
      options={{headerShown: false}}
    />
    <Tab.Screen name="Settings" component={SettingsScreen} />
  </Tab.Navigator>
);
