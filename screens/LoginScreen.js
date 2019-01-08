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
import { createUser } from '../modules/firebaseAPI';

export default class LoginScreen extends React.Component {
    static navigationOptions = {
        title: 'Links'
    };

    state = {
        email: '',
        password: ''
    };

    validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    handleTextChange(text) {
        if (text == '' || text == '-') {
            text = '0';
        }
        this.setState({
            [text]: text
        });
    }

    submit() {
        const { email, password } = this.state;

        if (this.validateEmail(email)) {
            createUser(email, password);
        }
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
                        style={{ marginTpop: '5%' }}
                        onPress={this.submit()}
                    >
                        <View>
                            <Text>Submit</Text>
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
    text: {
        fontSize: 17,
        color: 'rgba(96,100,109,1)',
        lineHeight: 24,
        textAlign: 'center',
        marginBottom: 10
    },
    textInput: {
        fontSize: 17,
        color: 'rgba(96,100, 109,1)',
        lineHeight: 24,
        width: '100%',
        textAlign: 'left',
        marginBottom: 10,
        borderColor: '#ffffff',
        borderRightWidth: 30,
        borderLeftWidth: 30
    }
});
