import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Image } from 'react-native';
import InputField from '../../components/InputField';
import { w, h, totalSize } from '../../modules/Dimensions';
import GetStarted from './GetStarted';
import * as Firebase from '../../modules/firebaseAPI';
import firebase from 'firebase';

const companyLogo = require('../../assets/images/robot-dev.png');
const email = require('../../assets/images/email2.png');
const password = require('../../assets/images/password2.png');
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default class Login extends Component {
    state = {
        isEmailCorrect: false,
        isPasswordCorrect: false,
        isLogin: false
    };

    getStarted = () => {
        const email = this.email.getInputValue();
        const password = this.password.getInputValue();

        this.setState(
            {
                isEmailCorrect: email === '',
                isPasswordCorrect: password === ''
            },
            () => {
                if (email !== '' && password !== '') {
                    this.loginToFireBase(email, password);
                } else {
                    console.warn('Fill up all fields');
                }
            }
        );
    };

    loginToFireBase = (email, password) => {
        this.setState({ isLogin: true });
        Firebase.userLogin(email, password).then(user => {
            if (user) this.props.success(user);
            this.setState({ isLogin: false });
        });
    };

    render() {
        return (
            <KeyboardAwareScrollView>
                <View style={styles.container}>
                    <Image
                        style={styles.icon}
                        resizeMode="contain"
                        source={companyLogo}
                    />
                    <InputField
                        placeholder="Email"
                        keyboardType="email-address"
                        style={styles.email}
                        error={this.state.isEmailCorrect}
                        ref={ref => (this.email = ref)}
                        icon={email}
                    />
                    <InputField
                        placeholder="Password"
                        returnKeyType="done"
                        secureTextEntry={true}
                        blurOnSubmit={true}
                        error={this.state.isPasswordCorrect}
                        ref={ref => (this.password = ref)}
                        icon={password}
                    />
                    <GetStarted
                        click={this.getStarted}
                        isLogin={this.state.isLogin}
                    />
                    <View style={styles.textContainer}>
                        <TouchableOpacity
                            onPress={this.props.change('register')}
                            style={styles.touchable}
                            activeOpacity={0.6}
                        >
                            <Text style={styles.createAccount}>
                                Create Account
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={this.props.change('forgot')}
                            style={styles.touchable}
                            activeOpacity={0.6}
                        >
                            <Text style={styles.forgotPassword}>
                                Forgot Password
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAwareScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        marginTop: h(3)
    },
    icon: {
        width: w(50),
        height: h(20),
        marginTop: h(10),
        marginBottom: h(7)
    },
    textContainer: {
        width: w(100),
        flexDirection: 'row',
        marginTop: h(5)
    },
    email: {
        marginBottom: h(4.5)
    },
    touchable: {
        flex: 1
    },
    createAccount: {
        color: 'black',
        textAlign: 'center',
        fontSize: totalSize(2),
        fontWeight: '600'
    },
    forgotPassword: {
        color: 'black',
        textAlign: 'center',
        fontSize: totalSize(2),
        fontWeight: '600'
    }
});
