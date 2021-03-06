import { connect } from 'react-redux';
import { Image } from 'react-native';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { loginUser, loginAnonymously } from '../../redux/session/index';

import LoginView from './LoginView';

class Login extends Component {
    static navigationOptions = {
        tabBarLabel: 'login',
        tabBarIcon: ({ tintColor }) => (
            <Image
                source={require('../../../assets/ic_person_outline.png')}
                style={{ tintColor: tintColor }}
            />
        )
    };

    render() {
        return (
            <LoginView
                login={this.props.login}
                anonymousLogin={this.props.loginAnonymously}
            />
        );
    }
}

Login.propTypes = {
    login: PropTypes.func.isRequired
};

const mapDispatchToProps = {
    login: loginUser,
    loginAnonymously: loginAnonymously
};

export default connect(
    null,
    mapDispatchToProps
)(Login);
