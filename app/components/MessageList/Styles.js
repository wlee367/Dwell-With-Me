import { StyleSheet } from 'react-native';
import React from 'react';

export default StyleSheet.create({
    container: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#eeeeee'
    },
    flatlistContainerStyle: {
        flexGrow: 1,
        justifyContent: 'center'
    },
    placeholder: {
        fontSize: 16,
        color: 'grey',
        textAlign: 'center'
    }
});
