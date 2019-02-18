import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { sendMessage, updateMessage } from '../../redux/chat';

import MessageFormView from './MessageFormView';

const MessageForm = props => (
    <MessageFormView
        sending={props.sending}
        sendMessage={props.sendMessage}
        updateMessage={props.updateMessage}
        message={props.message}
        sendingError={props.sendingError}
    />
);

const mapStateToProps = state => ({
    sending: state.chat.sending,
    sendingError: state.chat.sendingError,
    message: state.chat.message
});

const mapDispatchToProps = {
    sendMessage,
    updateMessage
};

MessageForm.propTypes = {
    sending: PropTypes.bool.isRequired,
    sendMessage: PropTypes.func.isRequired,
    updateMessage: PropTypes.func.isRequired,
    message: PropTypes.string.isRequired,
    sendingError: PropTypes.string
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MessageForm);
