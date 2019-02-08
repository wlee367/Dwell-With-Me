import React from 'react';
import {
    createSwitchNavigator,
    createStackNavigator,
    createAppContainer
} from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import AuthLoadingScreen from '../screens/AuthLoadingScreen';
import Login from '../screens/Login/Login';
import Register from '../screens/Register/Register';

const AuthStack = createStackNavigator({
    login: { screen: Login },
    register: { screen: Register }
});

const switchNaviagtor = createSwitchNavigator(
    {
        Main: MainTabNavigator,
        Auth: AuthStack,
        AuthLoading: AuthLoadingScreen
    },
    {
        initialRouteName: 'AuthLoading'
    }
);

export default createAppContainer(switchNaviagtor);
