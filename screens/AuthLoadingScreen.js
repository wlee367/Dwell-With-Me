import React, { Component } from 'react';
import {
    ActivityIndicator,
    AsyncStorage,
    StatusBar,
    StyleSheet,
    View
} from 'react-native';
import firebase from 'firebase';

class AuthLoadingScreen extends Component {
    constructor(props) {
        super(props);
        this._bootstrapAsync();
    }

    //fetch the token from storage then navigate to our appropriate place
    _bootstrapAsync = async () => {
        const userToken = await AsyncStorage.getItem('userToken');
        console.log(firebase.auth().currentUser);

        this.props.navigation.navigate(false ? 'App' : 'Auth');
    };

    render() {
        return (
            <View style={styles.conatiner}>
                <ActivityIndicator />
                <StatusBar barStyle="default" />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    conatiner: {
        flex: 1,
        backgroundColor: '#fff',
        marginHorizontal: 50,
        paddingTop: '50%',
        alignItems: 'center'
    }
});

export default AuthLoadingScreen;
