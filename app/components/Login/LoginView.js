import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Form from '../Form/Form';

const LoginView = props => (
    <Form
        buttonTitle={'Login'}
        onButtonPress={props.login}
        secondButton={'Login Anonymously'}
        onSecondButtonPress={props.anonymousLogin}
    />
);

LoginView.propTypes = {
    login: PropTypes.func.isRequired
};

export default LoginView;
