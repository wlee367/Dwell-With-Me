import React, { Component } from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import relativeDate from 'relative-date';

import styles from './Styles';

const MESSAGE_TEXT_MARGIN = 50;

const MessageRowView = props => {
    const isCurrentUser = props.isCurrentUser;
    const alignItems = isCurrentUser ? 'flex-end' : 'flex-start';
    const margin = isCurrentUser
        ? { marginLeft: MESSAGE_TEXT_MARGIN }
        : { marginRight: MESSAGE_TEXT_MARGIN };
    const username = isCurrentUser ? 'you' : props.message.user.name;
    const date = relativeDate(new Date(props.message.createdAt));

    // const color = isCurrentUser
    //     ? '#3399FF'
    //     : '#' + (Math.random().toString(16) + '000000').slice(2, 8);

    return (
        <View style={styles.container}>
            <View
                style={[
                    styles.bubbleView,
                    {
                        alignItems: alignItems,
                        backgroundColor: props.message.color
                    },
                    margin
                ]}
            >
                <Text style={styles.userText}>{date + ' - ' + username}</Text>
                <Text style={styles.messageText}>{props.message.text}</Text>
            </View>
        </View>
    );
};

MessageRowView.propTypes = {
    isCurrentUser: PropTypes.bool.isRequired,
    message: PropTypes.shape({
        createdAt: PropTypes.number.isRequired,
        text: PropTypes.string.isRequired,
        user: PropTypes.shape({
            email: PropTypes.string.isRequired
        })
    })
};

export default MessageRowView;
