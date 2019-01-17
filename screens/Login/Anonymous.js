import React, { Component } from 'react';
import {
    StyleSheet,
    ActivityIndicator,
    Text,
    TouchableOpacity
} from 'react-native';
import PropTypes from 'prop-types';
import { w, h, totalSize } from '../../modules/Dimensions';

export default class Anonymous extends Component {
    render() {
        return (
            <TouchableOpacity
                onPress={this.props.click}
                style={styles.button}
                activeOpacity={0.6}
            >
                {this.props.isLogin ? (
                    <ActivityIndicator
                        size="large"
                        style={styles.spinner}
                        color="black"
                    />
                ) : (
                    <Text style={styles.text}>CONTINUE ANONYMOUSLY</Text>
                )}
            </TouchableOpacity>
        );
    }
}

Anonymous.propTypes = {
    click: PropTypes.func.isRequired,
    isLogin: PropTypes.bool.isRequired
};

const styles = StyleSheet.create({
    button: {
        width: w(85),
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        paddingVertical: w(2),
        borderRadius: w(10),
        borderColor: '#E0E0E0',
        borderWidth: 1,
        marginTop: h(2)
    },
    text: {
        color: 'black',
        fontWeight: '700',
        paddingVertical: h(1),
        fontSize: totalSize(2.1)
    },
    spinner: {
        height: h(5)
    }
});
