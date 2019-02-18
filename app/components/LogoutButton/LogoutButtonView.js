import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Image } from 'react-native';

import styles from './Styles';

const LogoutButtonView = props => (
    <TouchableOpacity style={styles.container} onPress={props.logout}>
        <Image source={require('../../../assets/icon.png')} />
    </TouchableOpacity>
);

LogoutButtonView.propTypes = {
    logout: PropTypes.func.isRequired
};

export default LogoutButtonView;