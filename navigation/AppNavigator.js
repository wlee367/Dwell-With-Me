import React from 'react';
import {
    createSwitchNavigator,
    createStackNavigator,
    createAppContainer
} from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import AuthScreen from '../screens/AuthScreen';
import AuthLoadingScreen from '../screens/AuthLoadingScreen';

const AuthStack = createStackNavigator({
    Login: AuthScreen
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
