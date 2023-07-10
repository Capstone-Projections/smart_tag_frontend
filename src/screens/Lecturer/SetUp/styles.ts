import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        paddingTop: 60,
        paddingLeft: 40,
    },
    formControl: {
        borderColor: 'black',
        width: 300,
    },
    input: {
        height: 40,
        backgroundColor: 'white',
        borderColor: 'black',
        paddingHorizontal: 10,
        fontSize: 16,
    },
    header: {
        fontFamily: 'Poppins-Bold',
        fontSize: 20,
        textAlign: 'center',
    },
    text: {
        fontFamily: 'Poppins',
        fontSize: 14,
        fontWeight: '400',
    },
    button: {
        width: 300,
        height: 58,
        borderRadius: 8,
    },
});
