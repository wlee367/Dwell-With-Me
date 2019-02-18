import React, { Component } from 'react';
import { KeyboardAvoidingView } from 'react-native';

import MessageList from '../../MessageList/index';
import MessageForm from '../../MessageForm/index';

import styles from './Styles';

const ChatScreenComponent = () => (
    <KeyboardAvoidingView
        style={styles.container}
        behavior="padding"
        keyboardVerticalOffset={64}
    >
        <MessageList />
        <MessageForm />
    </KeyboardAvoidingView>
);

export default ChatScreenComponent;
