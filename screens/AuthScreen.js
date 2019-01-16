import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    KeyboardAvoidingView,
    StyleSheet,
    ImageBackground
} from 'react-native';
import Login from './Login/Login';
import Register from './Register/Register';
// import ForgotPassword from './screens/ForgotPassword';
import { w } from '../modules/Dimensions';
import firebase from 'firebase';

export default class AuthScreen extends Component {
    state = {
        currentScreen: 'login' // can be: 'login' or 'register' or 'forgot'
    };

    static navigationOptions = {
        // title: 'Login'
        header: null
    };

    changeScreen = screenName => () => {
        this.setState({ currentScreen: screenName });
    };

    componentDidMount() {
        this.watchAuthState(this.props.navigation);
    }

    watchAuthState(navigation) {
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                navigation.navigate('Main');
            }
        });
    }

    userSuccessfullyLoggedIn = (user, navigation) => {
        if (user) navigation.navigate('Main');
    };

    render() {
        let screenToShow;

        switch (this.state.currentScreen) {
            case 'login':
                screenToShow = (
                    <Login
                        change={this.changeScreen}
                        success={this.userSuccessfullyLoggedIn}
                    />
                );
                break;
            case 'register':
                screenToShow = <Register change={this.changeScreen} />;
                break;
            // case 'forgot':
            //     screenToShow = <ForgotPassword change={this.changeScreen} />;
            //     break;
        }

        return (
            <KeyboardAvoidingView
                behavior="position"
                keyboardVerticalOffset={-w(40)}
                style={styles.container}
            >
                <ImageBackground
                    source={this.props.background}
                    style={styles.background}
                    resizeMode="stretch"
                >
                    {screenToShow}
                </ImageBackground>
            </KeyboardAvoidingView>
        );
    }
}

AuthScreen.defaultProps = {
    background: null
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: 'white'
    },
    background: {
        width: '100%',
        height: '100%'
    }
});
