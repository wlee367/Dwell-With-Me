import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Form from '../Form/Form';

const RegisterView = props => (
    <Form buttonTitle={'signup'} onButtonPress={props.signup} />
);

RegisterView.propTypes = {
    signup: PropTypes.func.isRequired
};

export default RegisterView;
