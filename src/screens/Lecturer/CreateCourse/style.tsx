import { StyleSheet } from 'react-native';
import { appBlue } from '../../../resources/colors/colors';

export const styles = StyleSheet.create({
    container: {
        // alignItems: 'center',
    },
    headerText: {
        fontFamily: 'Poppins',
        fontSize: 20,

        textAlign: 'center',
    },
    line: {
        borderBottomWidth: 1,
        borderBottomColor: 'lightgray',
        marginVertical: 0,
    },
    formControl: {
        borderColor: 'black',
        width: '100%',
    },
    input: {
        height: 50,
        backgroundColor: 'white',
        borderColor: 'black',
        paddingHorizontal: 10,
        fontSize: 16,
    },
    text: {
        fontFamily: 'Poppins',
        fontSize: 16,
    },
    buttonRow: {
        paddingTop: 20,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    button: {
        width: 140,
        height: 50,
        borderRadius: 8,
    },
    buttonOutline: {
        width: 140,
        height: 50,
        borderRadius: 8,
        borderColor: appBlue,
    },
    buttonSpace: {
        width: 15,
    },
    buttonText: {
        color: appBlue,
        fontSize: 18,
    },
    instructionText: {
        fontFamily: 'Poppins',
        fontSize: 16,
        textAlign: 'center',
        marginVertical: 15,
    },
    noteContainer: {
        alignItems: 'center',
        paddingVertical: 20,
    },
    noteText: {
        fontFamily: 'Poppins',
        fontSize: 14,
        color: 'gray',
        textAlign: 'center',
    },
});
