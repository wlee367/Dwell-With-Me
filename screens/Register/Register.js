import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { w, h, totalSize } from '../../modules/Dimensions';
import InputField from '../../components/InputField';
import Continue from './Continue';
import * as Firebase from '../../modules/firebaseAPI';

import { Ionicons } from '@expo/vector-icons';

const email = require('../../assets/images/email2.png');
const password = require('../../assets/images/password2.png');
const repeat = require('../../assets/images/password2.png');
const person = require('../../assets/images/person2.png');

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default class Register extends Component {
    state = {
        isNameCorrect: false,
        isEmailCorrect: false,
        isPasswordCorrect: false,
        isRepeatCorrect: false,
        isCreatingAccount: false
    };

    createUserAccount = () => {
        const name = this.name.getInputValue();
        const email = this.email.getInputValue();
        const password = this.password.getInputValue();
        const repeat = this.repeat.getInputValue();

        this.setState(
            {
                isNameCorrect: name === '',
                isEmailCorrect: email === '',
                isPasswordCorrect: password === '',
                isRepeatCorrect: repeat === '' || repeat !== password
            },
            () => {
                if (
                    name !== '' &&
                    email !== '' &&
                    password !== '' &&
                    (repeat !== '' && repeat === password)
                ) {
                    this.createFireBaseAccount(name, email, password);
                } else {
                    console.warn('Fill up all fields correctly');
                }
            }
        );
    };

    createFireBaseAccount = (name, email, password) => {
        this.setState({ isCreatingAccount: true });
        Firebase.createFirebaseAccount(name, email, password).then(result => {
            if (result) {
                this.props.navigation.navigate('login');
            }
            this.setState({ isCreatingAccount: false });
        });
    };

    changeInputFocus = name => () => {
        switch (name) {
            case 'Name':
                this.setState({
                    isNameCorrect: this.name.getInputValue() === ''
                });
                this.email.input.focus();
                break;
            case 'Email':
                this.setState({
                    isEmailCorrect: this.email.getInputValue() === ''
                });
                this.password.input.focus();
                break;
            case 'Password':
                this.setState({
                    isPasswordCorrect: this.password.getInputValue() === '',
                    isRepeatCorrect:
                        this.repeat.getInputValue() !== '' &&
                        this.repeat.getInputValue() !==
                            this.password.getInputValue()
                });
                this.repeat.input.focus();
                break;
            default:
                this.setState({
                    isRepeatCorrect:
                        this.repeat.getInputValue() === '' ||
                        this.repeat.getInputValue() !==
                            this.password.getInputValue()
                });
        }
    };

    render() {
        return (
            <KeyboardAwareScrollView>
                <View style={styles.container}>
                    <Text style={styles.create}>CREATE ACCOUNT</Text>
                    <InputField
                        placeholder="Name"
                        autoCapitalize="words"
                        error={this.state.isNameCorrect}
                        style={styles.input}
                        focus={this.changeInputFocus}
                        ref={ref => (this.name = ref)}
                        icon={person}
                    />
                    <InputField
                        placeholder="Email"
                        keyboardType="email-address"
                        error={this.state.isEmailCorrect}
                        style={styles.input}
                        focus={this.changeInputFocus}
                        ref={ref => (this.email = ref)}
                        icon={email}
                    />
                    <InputField
                        placeholder="Password"
                        error={this.state.isPasswordCorrect}
                        style={styles.input}
                        focus={this.changeInputFocus}
                        ref={ref => (this.password = ref)}
                        secureTextEntry={true}
                        icon={password}
                    />
                    <InputField
                        placeholder="Repeat Password"
                        error={this.state.isRepeatCorrect}
                        style={styles.input}
                        secureTextEntry={true}
                        returnKeyType="done"
                        blurOnSubmit={true}
                        focus={this.changeInputFocus}
                        ref={ref => (this.repeat = ref)}
                        icon={repeat}
                    />
                    <Continue
                        isCreating={this.state.isCreatingAccount}
                        click={this.createUserAccount}
                    />
                    <TouchableOpacity
                        // onPress={this.props.change('login')}
                        onPress={() => this.props.navigation.navigate('login')}
                        style={styles.touchable}
                    >
                        <Text style={styles.signIn}>{'<'} Sign In</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAwareScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: h(3)
    },
    create: {
        color: 'black',
        fontSize: totalSize(2.4),
        marginTop: h(8),
        marginBottom: h(4),
        fontWeight: '700'
    },
    signIn: {
        color: 'black',
        fontSize: totalSize(2),
        fontWeight: '700'
    },
    touchable: {
        alignSelf: 'flex-start',
        marginLeft: w(8),
        marginTop: h(4)
    },
    input: {
        marginVertical: h(2),
        color: 'black'
    }
});
