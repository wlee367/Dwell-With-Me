import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Platform,
    TextInput,
    TouchableOpacity
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
        password: ''
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

    createUser() {
        FirebaseAPI.createUser(this.state.email, this.state.password);
    }

    signIn() {
        FirebaseAPI.signInUser(this.state.email, this.state.password);
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.textContainer}>
                    <Text style={styles.text}>Create an account below</Text>
                    <TextInput
                        style={styles.textInput}
                        onChangeText={email => this.setState({ email })}
                        value={this.state.email}
                        placeholder="Email"
                    />
                    <TextInput
                        style={styles.textInput}
                        placeholder="password"
                        onChangeText={password => this.setState({ password })}
                        value={
                            this.state.password
                                ? String(this.state.password)
                                : null
                        }
                    />
                    <TouchableOpacity
                        style={{ marginTop: '5%' }}
                        onPress={() => this.signIn()}
                    >
                        <View>
                            <Text>Log In Existing</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{ marginTop: '5%' }}
                        onPress={() => this.createUser()}
                    >
                        <View>
                            <Text>Create New User</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    textContainer: {
        flex: 1,
        alignItems: 'center',
        marginHorizontal: 50,
        paddingTop: '50%'
    },
    textInput: {
        fontSize: 17,
        lineHeight: 24,
        width: '75%'
    },
    text: {
        fontSize: 17,
        color: 'rgba(96,100,109, 1)',
        lineHeight: 24,
        width: '75%',
        marginBottom: '10%',
        textAlign: 'center'
    }
});
