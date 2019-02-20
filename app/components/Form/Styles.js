import { StyleSheet, Dimensions } from 'react-native';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

export default StyleSheet.create({
    form: {
        flex: 1,
        justifyContent: 'center',
        paddingTop: height / 3,
        paddingBottom: height / 4,
        fontFamily: 'System'
    },
    container: {
        flex: 1,
        alignItems: 'stretch',
        justifyContent: 'center'
    },
    textInput: {
        backgroundColor: '#ffffff',
        height: 40,
        margin: 10,
        borderRadius: 5,
        padding: 3
    },
    button: {
        backgroundColor: '#17B890',
        height: 40,
        margin: 10,
        borderRadius: 5,
        padding: 3,
        alignItems: 'center',
        justifyContent: 'center',
        top: 50
    },
    buttonTitle: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: 'bold'
    }
});
