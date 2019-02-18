import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Provider } from 'react-redux';

import { configureStore } from './app/redux';

import Chat from './app/components/Chat/index';

const store = configureStore();

class App extends Component {
    render() {
        <Provider store={store}>
            <Chat />
        </Provider>;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default App;
