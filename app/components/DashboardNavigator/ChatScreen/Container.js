import React, { Component } from 'react';

import ChatScreen from './Component';
import LogoutButton from '../../LogoutButton/LogoutButton';

class ChatScreenContainer extends Component {
    static navigationOptions = {
        title: 'chat',
        headerRight: <LogoutButton />
    };

    render() {
        return <ChatScreen />;
    }
}

export default ChatScreenContainer;
