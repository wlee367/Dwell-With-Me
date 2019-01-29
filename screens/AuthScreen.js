import React, { Component } from 'react';
import {
    KeyboardAvoidingView,
    StyleSheet,
    ImageBackground
} from 'react-native';
import Login from './Login/Login';
import Register from './Register/Register';
import { w } from '../modules/Dimensions';

export default class AuthScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentScreen: 'login', // can be: 'login' or 'register' or 'forgot'
            isAnonymous: false,
            uid: '',
            batteryPercent: '' // I imagine this is where we keep track of their battery
        };
    }
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
        const that = this;
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                const isAnonymous = user.isAnonymous;
                const uid = user.uid;
                that.setState({
                    isAnonymous,
                    uid
                });

                that.userSuccessfullyLoggedIn(user, navigation);
            }
        });
    }

    userSuccessfullyLoggedIn = (user, navigation) => {
        if (user) {
            navigation.navigate('Main');
        }
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
