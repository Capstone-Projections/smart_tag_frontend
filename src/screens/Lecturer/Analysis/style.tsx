import { StyleSheet } from 'react-native';
import { infoColor, whiteColor } from '../../../resources/colors/colors';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTextContainer: {},
    subTextContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingRight: 10,
        paddingLeft: 5,
    },
    headerText: {
        textAlign: 'center',
        fontFamily: 'Poppins',
        fontWeight: '600',
        fontSize: 20,
    },
    line: {
        borderBottomWidth: 1,
        borderBottomColor: 'lightgray',
        marginVertical: 0,
    },
    text: {
        textAlign: 'center',
        fontFamily: 'Poppins',

        fontSize: 17,
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
    datePicker: {
        height: 120,
        marginTop: -10,
    },
    pickerButton: {
        paddingHorizontal: 20,
    },
    button: {
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        marginTop: 10,
        marginBottom: 10,
        backgroundColor: infoColor,
    },
    buttonText: {
        fontSize: 14,
        fontWeight: '500',
        color: whiteColor,
    },
    dateText: {
        fontFamily: 'Poppins',
        fontSize: 16,
    },
    datePickerContainer: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginBottom: 20,
    },
    chartContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
