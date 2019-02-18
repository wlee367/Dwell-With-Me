import React, { Component } from 'react';
import PropTypes from 'prop-types';

import MessageRowView from './MessageRowView';

import firebaseService from '../../../services/FirebaseService';

class MessageRow extends Component {
    render() {
        const isCurrentUser =
            firebaseService.auth().currentUser.email ==
            this.props.message.user.email;
        return (
            <MessageRowView
                message={this.props.message}
                isCurrentUser={isCurrentUser}
            />
        );
    }
}

MessageRow.propTypes = {
    message: PropTypes.object.isRequired
};

export default MessageRow;
