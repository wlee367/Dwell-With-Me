import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import Fire from '../../modules/Fire';

import { GiftedChat } from 'react-native-gifted-chat';

class Chat extends Component {
    state = {
        messages: []
    };

    componentDidMount() {
        Fire.shared.on(message =>
            this.setState(previousState => ({
                messages: GiftedChat.append(previousState.messages, message)
            }))
        );
    }

    componentWillUnmount() {
        Fire.shared.off();
    }

    get user() {
        // Return our name and our UID for GiftedChat to parse
        return {
            // name: this.props.navigation.state.params.name,
            _id: Fire.shared.uid
        };
    }

    render() {
        return (
            <GiftedChat
                messages={this.state.messages}
                onSend={Fire.shared.send}
                user={this.user}
            />
        );
    }
}

const styles = StyleSheet.create({});

export default Chat;
