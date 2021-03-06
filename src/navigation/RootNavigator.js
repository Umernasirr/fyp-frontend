import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';

import SplashScreen from '../screens/splashScreen/splashScreen';
import LoginScreen from '../screens/login/login';
import Signup from '../screens/signup/signup';
import Generate from '../screens/generate/generate';
import Home from '../screens/home/home';
import ForgotPassword from '../screens/forgotpassword/forgotpassword';
import Settings from '../screens/settings/settings';
import Header from '../components/Header';
import SongPlayer from '../screens/SongPlayer/SongPlayer';
import UserList from '../screens/userList/userList';
import AccountSettings from '../screens/accountSettings/accountSettings';
import Color from '../constants/Color';
import Feed from '../screens/feed/feed';
import NotificationSettings from '../screens/notificationSettings/notificationSettings';
import Help from '../screens/help/help';
import About from '../screens/about/about';
import Chat from '../screens/chat/chat';
import Room from '../screens/room/room';
import ManageFriends from '../screens/manageFriends/manageFriends';
import UserDetails from '../screens/userDetails/userDetails';
const Stack = createStackNavigator();
const BottomTab = createMaterialBottomTabNavigator();
const MusicStack = createStackNavigator();
const SettingsStack = createStackNavigator();
const ChatStack = createStackNavigator();
const UserStack = createStackNavigator();
const MusicStackScreens = () => (
  <MusicStack.Navigator>
    <MusicStack.Screen
      options={{
        headerShown: false,
      }}
      name="Feed"
      component={Feed}
    />
    <MusicStack.Screen
      options={{
        headerShown: false,
      }}
      name="SongPlayer"
      component={SongPlayer}
    />
  </MusicStack.Navigator>
);

const SettingsStackScreens = () => (
  <SettingsStack.Navigator initialRouteName="SettingsMain">
    <SettingsStack.Screen
      options={{
        headerShown: false,
      }}
      name="SettingsMain"
      component={Settings}
    />
    <SettingsStack.Screen
      options={{
        headerShown: false,
      }}
      name="AccountSettings"
      component={AccountSettings}
    />

    <SettingsStack.Screen
      options={{
        headerShown: false,
      }}
      name="NotificationSettings"
      component={NotificationSettings}
    />

    <SettingsStack.Screen
      options={{
        headerShown: false,
      }}
      name="Help"
      component={Help}
    />

    <SettingsStack.Screen
      options={{
        headerShown: false,
      }}
      name="ManageFriends"
      component={ManageFriends}
    />

    <SettingsStack.Screen
      options={{
        headerShown: false,
      }}
      name="About"
      component={About}
    />
  </SettingsStack.Navigator>
);

const ChatStackScreens = () => (
  <ChatStack.Navigator>
    <ChatStack.Screen
      options={{
        headerShown: false,
      }}
      name="Room"
      component={Room}
    />
    <ChatStack.Screen
      options={{
        headerShown: false,
      }}
      name="Chat"
      component={Chat}
    />
  </ChatStack.Navigator>
);

const UserStackScreens = () => (
  <UserStack.Navigator>
    <UserStack.Screen
      options={{
        headerShown: false,
      }}
      name="UserListMain"
      component={UserList}
    />
    <UserStack.Screen
      options={{
        headerShown: false,
      }}
      name="UserDetails"
      component={UserDetails}
    />
  </UserStack.Navigator>
);

const BottomTabStack = () => (
  <BottomTab.Navigator
    initialRouteName="Home"
    activeColor={Color.primary}
    inactiveColor="black"
    barStyle={{backgroundColor: 'white', color: 'black'}}>
    <BottomTab.Screen
      name="Generate"
      options={{
        tabBarIcon: ({color, size}) => (
          <Ionicons name="add-outline" color={color} size={20} />
        ),
      }}
      component={Generate}
    />

    <BottomTab.Screen
      name="Home"
      options={{
        tabBarIcon: ({color, size}) => (
          <Feather name="home" color={color} size={20} />
        ),
      }}
      component={MusicStackScreens}
    />

    <BottomTab.Screen
      name="SongList"
      options={{
        tabBarIcon: ({color, size}) => (
          <Feather name="music" color={color} size={20} />
        ),
      }}
      component={Home}
    />

    <BottomTab.Screen
      name="UserList"
      options={{
        tabBarIcon: ({color, size}) => (
          <Feather name="user" color={color} size={20} />
        ),
      }}
      component={UserStackScreens}
    />

    <BottomTab.Screen
      name="Settings"
      component={SettingsStackScreens}
      options={{
        tabBarIcon: ({color, size}) => (
          <Feather name="settings" color={color} size={20} />
        ),
      }}
    />

    <BottomTab.Screen
      name="Chat"
      component={ChatStackScreens}
      options={{
        tabBarIcon: ({color, size}) => (
          <Ionicons name="chatbox-outline" color={color} size={20} />
        ),
      }}
    />
  </BottomTab.Navigator>
);

function RootNavigator() {
  return (
    <Stack.Navigator initialRouteName="SplashScreen">
      <Stack.Screen
        name="SplashScreen"
        options={{
          headerShown: false,
      }}
        component={SplashScreen}
      />
      {/* <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="AppNavigator" component={AppNavigator} /> */}
      <Stack.Screen
        name="Signup"
        options={{header: (props) => <Header title="Signup" {...props} />}}
        component={Signup}
      />
      <Stack.Screen
        options={{
          header: (props) => <Header title="Login" {...props} back={false} />,
        }}
        name="Login"
        component={LoginScreen}
      />

      <Stack.Screen
        name="ForgotPassword"
        options={{
          headerShown: false,
        }}
        component={ForgotPassword}
      />
      <Stack.Screen
        name="Home"
        options={{
          headerShown: false,
        }}
        component={BottomTabStack}
      />
    </Stack.Navigator>
  );
}

export default RootNavigator;
