import React, { Component } from 'react';
import PropTypes from 'prop-types';

import RegisterForm from '../Form/RegisterForm';

const RegisterView = props => (
    <RegisterForm buttonTitle={'signup'} onButtonPress={props.signup} />
);

RegisterView.propTypes = {
    signup: PropTypes.func.isRequired
};

export default RegisterView;
