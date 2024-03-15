import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {HomeScreen} from './HomeScreen';
import {ChatScreen} from './ChatScreen';
import {SettingsScreen} from './SettingsScreen';

export type HomeStackParamList = {
  Home: undefined;
  Chat: {chatId: number};
};

const HomeStack = createNativeStackNavigator<HomeStackParamList>();
export const HomeStackScreen = () => (
  <HomeStack.Navigator initialRouteName="Home">
    <HomeStack.Screen name="Home" component={HomeScreen} />
    <HomeStack.Screen name="Chat" component={ChatScreen} />
  </HomeStack.Navigator>
);

export type SettingsStackParamList = {
  Settings: undefined;
};

const SettingsStack = createNativeStackNavigator<SettingsStackParamList>();

export const SettingsStackScreen = () => (
  <SettingsStack.Navigator initialRouteName="Settings">
    <SettingsStack.Screen name="Settings" component={SettingsScreen} />
  </SettingsStack.Navigator>
);

export type BottomTabsParamList = {
  HomeStack: undefined;
  SettingsStack: undefined;
};

const Tabs = createBottomTabNavigator<BottomTabsParamList>();

export const RootTabs = () => (
  <Tabs.Navigator screenOptions={{headerShown: false}}>
    <Tabs.Screen
      name="HomeStack"
      component={HomeStackScreen}
      options={{title: 'Home'}}
    />
    <Tabs.Screen
      name="SettingsStack"
      component={SettingsStackScreen}
      options={{title: 'Settings'}}
    />
  </Tabs.Navigator>
);
