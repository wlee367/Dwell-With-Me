import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { loadMessages } from '../../redux/chat/actions';
import { getChatItems } from '../../redux/chat/selectors';

import MessageListView from './MessageListView';

class MessageList extends Component {
    componentDidMount() {
        this.props.loadMessages();
    }

    render() {
        const data = getChatItems(this.props.messages).reverse();
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
