import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { w, h, totalSize } from '../../modules/Dimensions';
import InputField from '../../components/InputField';
import Firebase from '../../modules/firebaseAPI';

const email = require('../../assets/images/email2.png');

export default class ForgotPassword extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isEmailCorrect: false,
            email: ''
        };
        this.sendEmail = this.sendEmail.bind(this);
        this.sendEmailWithPassword = this.sendEmailWithPassword.bind(this);
    }

    sendEmail = () => {
        const email = this.email.getInputValue();
        console.log(email);
        this.setState(
            {
                isEmailCorrect: email === ''
            },
            () => {
                if (email !== '') {
                    this.sendEmailWithPassword(email);
                } else {
                    console.warn('Enter correct e-mail address');
                }
            }
        );
    };

    sendEmailWithPassword = email => {
        Firebase.sendEmailWithPassword(email)
            .then(result => {
                console.log(result);
                if (result) this.props.navigation.navigate('login')();
            })
            .catch(err => {
                console.log(err);
            });
    };

    onFocusChanged = () => {
        console.log(this.email.getInputValue());
        this.setState({ isEmailCorrect: this.email.getInputValue() === '' });
    };

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.forgot}>Forgot Your Password?</Text>
                <InputField
                    placeholder="Email"
                    keyboardType="email-address"
                    error={this.state.isEmailCorrect}
                    returnKeyType="done"
                    blurOnSubmit={true}
                    focus={this.changeInputFocus}
                    ref={ref => (this.email = ref)}
                    icon={email}
                    // onChangeText={email => this.setState({ email })}
                />
                <TouchableOpacity
                    onPress={this.sendEmail}
                    activeOpacity={0.6}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Send Email</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {}} style={styles.touchable}>
                    <Text style={styles.login}>{'<'} Back To Login</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    forgot: {
        color: 'black',
        fontSize: totalSize(2.5),
        marginBottom: h(5),
        fontWeight: '700'
    },
    button: {
        width: w(85),
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        paddingVertical: w(2),
        borderRadius: w(10),
        borderColor: '#E0E0E0',
        borderWidth: 1,
        marginTop: h(2)
    },
    buttonText: {
        color: 'black',
        fontWeight: '600',
        paddingVertical: h(1),
        fontSize: totalSize(2)
    },
    login: {
        color: 'black',
        fontSize: totalSize(2),
        fontWeight: '700'
    },
    touchable: {
        alignSelf: 'flex-start',
        marginLeft: w(8),
        marginTop: h(4)
    }
});
