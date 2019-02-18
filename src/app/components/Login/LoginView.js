import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Form from '../Form/Form';

import translations from '../../i18n';

const LoginView = props => (
    <Form buttonTitle={translations.t('login')} onButtonPress={props.login} />
);

LoginView.propTypes = {
    login: PropTypes.func.isRequired
};

export default LoginView;
