import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Form from '../Form/Form';

import translations from '../../i18n';

const RegisterView = props => (
    <Form buttonTitle={translations.t('signup')} onButtonPress={props.signup} />
);

RegisterView.propTypes = {
    signup: PropTypes.func.isRequired
};

export default RegisterView;
