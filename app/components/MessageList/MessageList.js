import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { loadMessages } from '../../redux/chat/actions';
import { getChatItems } from '../../redux/chat/selectors';

import MessageListView from './MessageListView';

import firebaseService from '../../services/FirebaseService';

class MessageList extends Component {
    componentDidMount() {
        this.props.loadMessages();
    }

    generateHex() {
        return '#' + (Math.random().toString(16) + '000000').slice(2, 8);
    }

    render() {
        let data = getChatItems(this.props.messages).reverse();

        const currentUser = firebaseService.auth().currentUser;

        Object.keys(data).map(key => {
            const message = data[key];

            message.key = key;

            if (!message.user.email) {
                message.user.email = `anon${key}@dwell-with-me.com`;
            }

            message.color =
                currentUser.email === message.user.email
                    ? '#3399FF'
                    : this.generateHex();
        });

        return <MessageListView data={data} />;
    }
}

const mapStateToProps = state => ({
    messages: state.chat.messages,
    error: state.chat.loadMessagesError
});

const mapDispatchToProps = {
    loadMessages
};

MessageList.propTypes = {
    messages: PropTypes.object,
    error: PropTypes.string,
    loadMessages: PropTypes.func.isRequired
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MessageList);
