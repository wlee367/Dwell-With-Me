import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import AuthScreenView from './AuthScreenView';

const AuthScreen = props => (
    <AuthScreenView loading={props.loading} error={props.error} />
);

const mapStateToProps = state => ({
    loading: state.session.loading,
    error: state.session.error
});

AuthScreen.propTypes = {
    loading: PropTypes.bool.isRequired,
    error: PropTypes.string
};

export default connect(mapStateToProps)(AuthScreen);
