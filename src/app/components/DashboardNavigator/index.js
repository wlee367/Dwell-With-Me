import { createStackNavigator, createAppContainer } from 'react-navigation';
import React from 'react';

import ChatScreen from './ChatScreen/index';

const routeConfig = {
    Chat: { screen: ChatScreen }
};

export default createAppContainer(createStackNavigator(routeConfig));
