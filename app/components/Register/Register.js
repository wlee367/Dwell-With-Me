import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Image } from 'react-native';

import { connect } from 'react-redux';

import { signupUser } from '../../redux/session/index';

import RegisterView from './RegisterView';

const personImage = require('../../../assets/ic_person_add.png');

class Register extends Component {
    static navigationOptions = {
        tabBarLabel: 'signup',
        tabBarIcon: ({ tintColor }) => (
            <Image source={personImage} style={{ tintColor: tintColor }} />
        )
    };

    render() {
        return <RegisterView signup={this.props.signup} />;
    }
}

Register.propTypes = {
    signup: PropTypes.func.isRequired
};

const mapDispatchToProps = {
    signup: signupUser
};

export default connect(
    null,
    mapDispatchToProps
)(Register);
