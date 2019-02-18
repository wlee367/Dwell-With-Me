import { TabNavigator } from 'react-navigation';

import Login from '../../Login/Login';
import SignUp from '../../Register/Register';

const routeConfigs = {
    Login: {
        screen: Login
    },
    SignUp: {
        screen: SignUp
    }
};

const tabBarOptions = {
    tabBarOptions: {
        activeTintColor: '#88cc88',
        inactiveTintColor: '#aaaaaa',
        showIcon: true,
        scrollEnabled: false,
        indicatorStyle: {
            display: 'none'
        },
        style: {
            backgroundColor: '#ffffff'
        }
    },
    tabBarPosition: 'bottom'
};

export default TabNavigator(routeConfigs, tabBarOptions);
