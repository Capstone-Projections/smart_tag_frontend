import { StyleSheet } from 'react-native';
import { appBlue, whiteColor } from '../../../resources/colors/colors';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: appBlue,
    },
    header: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    footer: {
        flex: 2,
        backgroundColor: whiteColor,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 30,
        paddingVertical: 50,
        justifyContent: 'center',
    },
    image: {
        width: 150,
        height: 150,

        borderRadius: 100,
    },
    text: {
        fontFamily: 'Poppins',
        fontSize: 30,
        textAlign: 'left',
    },
    subText: {
        fontFamily: 'Poppins',
        color: 'gray',
        fontSize: 15,
    },
    formControl: {
        borderColor: 'black',
        // width: '80%',
    },
    input: {
        height: 40,
        backgroundColor: 'white',
        borderColor: 'black',
        paddingHorizontal: 10,
        fontSize: 16,
    },
    button: {
        width: '100%',
        height: 58,
        borderRadius: 8,
    },
    link: {
        justifyContent: 'center',
        paddingLeft: 200,
        fontFamily: 'Poppins',
        paddingBottom: 0,
    },
    errorText: {
        color: 'red',
        fontSize: 12,
        marginTop: 4,
    },
});
