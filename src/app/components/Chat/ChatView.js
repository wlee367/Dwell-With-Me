import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { ActivityIndicator } from 'react-native';

import DashboardNavigator from '../DashboardNavigator';
import AuthScreen from '../AuthScreen/AuthScreen';
import styles from './Styles';

class ChatView extends Component {
    render() {
        if (this.props.restoring) {
            return <ActivityIndicator style={styles.ActivityIndicator} />;
        } else {
            if (props.logged) {
                return <DashboardNavigator />;
            } else {
                return <AuthScreen />;
            }
        }
    }
}

ChatView.propTypes = {
    restoring: PropTypes.bool.isRequired,
    logged: PropTypes.bool.isRequired
};

export default ChatView;
