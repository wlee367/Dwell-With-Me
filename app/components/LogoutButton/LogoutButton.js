import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { logoutUser } from '../../redux/session/index';

import LogoutButtonView from './LogoutButtonView';

const LogoutButton = props => <LogoutButtonView logout={props.logout} />;

const mapDispatchToProps = {
    logout: logoutUser
};

LogoutButton.propTypes = {
    logout: PropTypes.func.isRequired
};

export default connect(
    null,
    mapDispatchToProps
)(LogoutButton);
