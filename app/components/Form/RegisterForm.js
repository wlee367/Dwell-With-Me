import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    View,
    TextInput,
    TouchableOpacity,
    Text,
    Image,
    ImageBackground,
    Dimensions
} from 'react-native';

import {
    Container,
    Header,
    Content,
    Form as NativeForm,
    Item,
    Input,
    Label
} from 'native-base';

import styles from './Styles';

class RegisterForm extends Component {
    constructor(props) {
        super(props);
        this.state = { email: '', password: '' };

        this.handleEmailChange = email => {
            this.setState({ email: email });
        };

        this.handlePasswordChange = password => {
            this.setState({ password: password });
        };

        this.handleButtonPress = () => {
            this.props.onButtonPress(this.state.email, this.state.password);
        };
        this.handleSecondButtonPress = () => {
            this.props.onSecondButtonPress();
        };
    }

    render() {
        const height = Dimensions.get('window').height;
        const width = Dimensions.get('window').width;

        return (
            <Container>
                <Content contentContainerStyle={styles.form}>
                    <View style={{ left: width / 3 }}>
                        <Label>Dwell With Me</Label>
                    </View>
                    <NativeForm>
                        <Item floatingLabel>
                            <Label>Email</Label>
                            <Input
                                // style={styles.textInput}
                                returnKeyType="next"
                                keyboardType="email-address"
                                autoCapitalize="none"
                                onChangeText={this.handleEmailChange}
                                // value={this.state.email}
                                underlineColorAndroid={'transparent'}
                            />
                        </Item>
                        <Item floatingLabel>
                            <Label>Password</Label>
                            <Input
                                //style={styles.textInput}
                                secureTextEntry={true}
                                returnKeyType="done"
                                onChangeText={this.handlePasswordChange}
                                // value={this.state.password}
                                underlineColorAndroid={'transparent'}
                            />
                        </Item>

                        <Item floatingLabel last>
                            <Label>Confirm Password</Label>
                            <Input
                                //style={styles.textInput}
                                secureTextEntry={true}
                                returnKeyType="done"
                                onChangeText={this.handlePasswordChange}
                                // value={this.state.password}
                                underlineColorAndroid={'transparent'}
                            />
                        </Item>

                        <TouchableOpacity
                            style={styles.button}
                            onPress={this.handleButtonPress}
                        >
                            <Text style={styles.buttonTitle}>
                                {this.props.buttonTitle}
                            </Text>
                        </TouchableOpacity>
                    </NativeForm>
                </Content>
            </Container>
        );
    }
}

RegisterForm.propTypes = {
    buttonTitle: PropTypes.string.isRequired,
    onButtonPress: PropTypes.func.isRequired
};

export default RegisterForm;
