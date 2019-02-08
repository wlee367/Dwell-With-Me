import React from 'react';
import { ScrollView, StyleSheet, View, Text } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import Chat from '../components/Chat/Chat';
// import AppNavigator from '../navigation/AppNavigator';

export default class LinksScreen extends React.Component {
    static navigationOptions = {
        title: 'Links'
    };

    showMainTabs() {
        // return <AppNavigator />;
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                {/* Go ahead and delete ExpoLinksView and replace it with your
                 * content, we just wanted to provide you with some helpful links */}
                <View />
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 15,
        backgroundColor: '#fff'
    }
});
