import { StyleSheet } from 'react-native';
import { appBlue, whiteColor } from '../../../resources/colors/colors';

export const styles = StyleSheet.create({
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

        paddingHorizontal: 10,
        fontSize: 16,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        width: '100%',
        // textAlign: 'center',
    },
    text: {
        fontFamily: 'Poppins',
        fontSize: 16,
    },
    datePicker: {
        height: 120,
        marginTop: -10,
    },

    dropdownContainer: {
        marginVertical: 8,
    },

    dropdownBox: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 8,
        overflow: 'hidden', // This will hide any overflowing content
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

    timePickerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    timePicker: {
        flex: 1,
        marginHorizontal: 5,
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
