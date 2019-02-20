import { StyleSheet } from 'react-native';
import React from 'react';

export default StyleSheet.create({
    container: {
        flex: 1,
        padding: 8,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#eeeeee',
        borderRadius: 5
    },
    bubbleView: {
        // backgroundColor: '#3399FF',
        flex: 1,
        borderRadius: 8,
        padding: 8
    },
    userText: {
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold'
    },
    messageText: {
        flex: 1,
        color: 'white',
        fontSize: 16
    }
});
