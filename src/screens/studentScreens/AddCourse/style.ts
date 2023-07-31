import { StyleSheet } from 'react-native';
import { appBlue } from '../../../resources/colors/colors';

export const styles = StyleSheet.create({
    container: {
        alignContent: 'center',
    },
    text: {
        fontFamily: 'Poppins',
        fontSize: 16,
        textAlign: 'center',
        marginVertical: 15,
    },
    buttonRow: {
        paddingTop: 20,
        flexDirection: 'row',
        alignContent: 'center',
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
    headerText: {
        fontFamily: 'Poppins',
        fontSize: 20,
        fontWeight: '600',
        textAlign: 'center',
    },
    line: {
        borderBottomWidth: 1,
        borderBottomColor: 'lightgray',
        marginVertical: 0,
    },
    dropdownContainer: {
        marginVertical: 10,
        alignSelf: 'stretch',
    },
    dropdownBox: {
        width: '100%',
        height: 50,
        backgroundColor: '#FFF',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#444',
    },
    dropdownButton: {
        fontSize: 18,
        paddingHorizontal: 10,
        paddingVertical: 8,
        color: 'black',
    },
    dropdownStyle: {
        backgroundColor: '#EFEFEF',
    },
    dropdownIcon: {
        alignItems: 'flex-end',
    },
    dropdownIconText: {
        fontSize: 18,
        color: 'black',
    },
    dropdown1BtnStyle: {
        width: '100%',
        height: 50,
        backgroundColor: '#FFF',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#444',
    },
    dropdown1BtnTxtStyle: { color: '#444', textAlign: 'left' },
    dropdown1DropdownStyle: { backgroundColor: '#EFEFEF' },
    dropdown1RowStyle: {
        backgroundColor: '#EFEFEF',
        borderBottomColor: '#C5C5C5',
    },
    dropdown1RowTxtStyle: { color: '#444', textAlign: 'left' },
});
