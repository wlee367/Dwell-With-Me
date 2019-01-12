import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Platform,
    TouchableHighlight,
    TextInput,
    TouchableOpacity,
    Image
} from 'react-native';

import { ExpoLinksView } from '@expo/samples';
import * as FirebaseAPI from '../modules/firebaseAPI';
import firebase from 'firebase';

export default class LoginScreen extends React.Component {
    constructor(props) {
        super(props);
    }

    static navigationOptions = {
        title: 'Login'
    };

    state = {
        email: '',
        password: '',
        register: false
    };

    componentDidMount() {
        this.watchAuthState(this.props.navigation);
    }

    watchAuthState(navigation) {
        firebase.auth().onAuthStateChanged(function(user) {
            console.log('onAuthStatheChanged: ', user);

            if (user) {
                navigation.navigate('Main');
            }
        });
    }
    signIn() {
        FirebaseAPI.signInUser(this.state.email, this.state.password);
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.inputContainer}>
                    <Image
                        style={styles.inputIcon}
                        source={{
                            uri: 'https://png.icons8.com/message/ultraviolet'
                        }}
                    />
                    <TextInput
                        style={styles.inputs}
                        onChangeText={email => this.setState({ email })}
                        keyboardType="email-address"
                        underlineColorAndroid="transparent"
                        value={this.state.email}
                        placeholder="Email"
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Image
                        style={styles.inputIcon}
                        source={{
                            uri:
                                'https://png.icons8.com/key-2/ultraviolet/50/3498db'
                        }}
                    />
                    <TextInput
                        style={styles.inputs}
                        placeholder="password"
                        secureTextEntry={true}
                        onChangeText={password => this.setState({ password })}
                    />
                </View>
                <TouchableHighlight
                    style={[styles.buttonContainer, styles.loginButton]}
                    onPress={() => this.signIn()}
                >
                    <View>
                        <Text style={styles.loginText}>Log In</Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight
                    style={[styles.buttonContainer, styles.loginButton]}
                    onPress={() => this.createUser()}
                >
                    <View>
                        <Text style={styles.loginText}>Register</Text>
                    </View>
                </TouchableHighlight>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    inputContainer: {
        borderBottomColor: '#CCC',
        backgroundColor: '#FFFFFF',
        borderRadius: 30,
        borderBottomWidth: 1,
        width: 250,
        height: 45,
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center'
    },
    inputs: {
        height: 45,
        marginLeft: 16,
        borderBottomColor: '#FFFFFF',
        flex: 1
    },
    inputIcon: {
        width: 30,
        height: 30,
        marginLeft: 15,
        justifyContent: 'center'
    },
    buttonContainer: {
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        width: 250,
        borderRadius: 30
    },
    loginButton: {
        backgroundColor: '#00b5ec'
    },
    loginText: {
        color: 'white'
    }
});
