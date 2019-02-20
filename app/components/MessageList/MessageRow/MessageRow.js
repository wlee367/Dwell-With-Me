import React, { Component } from 'react';
import PropTypes from 'prop-types';

import MessageRowView from './MessageRowView';

import firebaseService from '../../../services/FirebaseService';

class MessageRow extends Component {
    render() {
        const currentUser = firebaseService.auth().currentUser;

        let isCurrentUser = currentUser.email == this.props.message.user.email;

        if (!firebaseService.auth().currentUser.email) {
            isCurrentUser = currentUser.uid == this.props.message.user.id;
        }
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
