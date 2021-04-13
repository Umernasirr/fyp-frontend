import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import Feather from 'react-native-vector-icons/Feather';

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

import Color from '../constants/Color';
const Stack = createStackNavigator();
const BottomTab = createMaterialBottomTabNavigator();
const MusicStack = createStackNavigator();

const MusicStackScreens = () => (
  <MusicStack.Navigator>
    <MusicStack.Screen
      options={{
        headerShown: false,
      }}
      name="Home"
      component={Home}
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
          <Feather name="music" color={color} size={20} />
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
      name="UserList"
      options={{
        tabBarIcon: ({color, size}) => (
          <Feather name="user" color={color} size={20} />
        ),
      }}
      component={UserList}
    />

    <BottomTab.Screen
      name="Settings"
      component={Settings}
      options={{
        tabBarIcon: ({color, size}) => (
          <Feather name="settings" color={color} size={20} />
        ),
      }}
    />
  </BottomTab.Navigator>
);

function RootNavigator() {
  return (
    <Stack.Navigator initialRouteName="Login">
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
