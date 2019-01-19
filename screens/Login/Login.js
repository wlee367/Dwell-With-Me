import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Text,
    Image,
    KeyboardAvoidingView,
    ImageBackground,
    ActivityIndicator
} from 'react-native';
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
    constructor() {
        super();

        this.state = {
            isEmailCorrect: false,
            isPasswordCorrect: false,
            isLogin: false,
            isLogin2: false
        };

        this._isMounted = false;
    }

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
        this._isMounted && this.setState({ isLogin: true });
        Firebase.userLogin(email, password)
            .then(user => {
                if (user) {
                    this._isMounted && this.setState({ isLogin: false });
                }
            })
            .catch(err => {
                this._isMounted &&
                    this.setState({
                        isLogin: false
                    });
                // throw Error();
            });
    };
    componentDidMount() {
        this._isMounted = true;
        this.watchAuthState(this.props.navigation);
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    watchAuthState(navigation) {
        const that = this;
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                const isAnonymous = user.isAnonymous;
                const uid = user.uid;
                that._isMounted &&
                    that.setState(
                        {
                            isAnonymous,
                            uid
                        },
                        () => {
                            navigation.navigate('Main');
                        }
                    );
            }
        });
    }

    signInAnonymous = () => {
        console.log('anony');
        this.setState({ isLogin2: true });
        firebase
            .auth()
            .signInAnonymously()
            .then(() => {
                this._isMounted && this.setState({ isLogin2: false });
            })
            .catch(err => {
                console.log(err.message);
                throw Error();
            });
    };

    render() {
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
                            <TouchableOpacity
                                onPress={this.signInAnonymous.bind(this)}
                                style={styles.button}
                                activeOpacity={0.6}
                            >
                                {this.props.isLogin2 ? (
                                    <ActivityIndicator
                                        size="large"
                                        style={styles.spinner}
                                        color="black"
                                    />
                                ) : (
                                    <Text style={styles.text}>
                                        CONTINUE ANONYMOUSLY
                                    </Text>
                                )}
                            </TouchableOpacity>
                            <View style={styles.textContainer}>
                                <TouchableOpacity
                                    // onPress={this.props.change('register')}
                                    onPress={() =>
                                        this.props.navigation.navigate(
                                            'register'
                                        )
                                    }
                                    style={styles.touchable}
                                    activeOpacity={0.6}
                                >
                                    <Text style={styles.createAccount}>
                                        Create Account
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => {
                                        this.props.navigation.navigate(
                                            'forgotpassword'
                                        );
                                    }}
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
                </ImageBackground>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        flex: 1,
        alignItems: 'center',
        marginTop: -h(3)
    },
    background: {
        width: '100%',
        height: '100%'
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
    text: {
        color: 'black',
        fontWeight: '700',
        paddingVertical: h(1),
        fontSize: totalSize(2.1)
    },
    spinner: {
        height: h(5)
    }
});
