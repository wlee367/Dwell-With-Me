import React from 'react';
import {
    createSwitchNavigator,
    createStackNavigator,
    createAppContainer
} from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import AuthScreen from '../screens/AuthScreen';
import AuthLoadingScreen from '../screens/AuthLoadingScreen';
import Login from '../screens/Login/Login';
import Register from '../screens/Register/Register';
import ForgotPassword from '../screens/ForgotPassword/ForgotPassword';

const AuthStack = createStackNavigator({
    // Login: AuthScreen,
    login: { screen: Login },
    register: { screen: Register },
    forgotpassword: { screen: ForgotPassword }
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
