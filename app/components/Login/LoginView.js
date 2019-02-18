import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Form from '../Form/Form';

const LoginView = props => (
    <Form buttonTitle={'login'} onButtonPress={props.login} />
);

LoginView.propTypes = {
    login: PropTypes.func.isRequired
};

export default LoginView;
