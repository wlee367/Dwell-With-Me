import { createStackNavigator, createAppContainer } from 'react-navigation';
import ChatScreen from './ChatScreen/index';

const routeConfig = {
    Chat: { screen: ChatScreen }
};

export default createAppContainer(createStackNavigator(routeConfig));
