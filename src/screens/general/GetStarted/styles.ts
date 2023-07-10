import { StyleSheet } from 'react-native';

export const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    title: {
        position: 'absolute',
        top: 15,
        left: 0,
        fontSize: 18,
        fontWeight: 'normal',
        fontFamily: 'Poppins',
    },
    imageContainer: {
        marginTop: 0,
        justifyContent: 'center',
        borderRadius: 10,
        margin: 10,
        marginBottom: 0,
        alignItems: 'center',
    },
    image: {
        width: 400,
        height: 450,
        borderRadius: 10,
        alignItems: 'center',
    },
    formControl: {
        borderColor: 'black',
        width: '80%',
    },
    input: {
        height: 40,
        backgroundColor: 'white',

        borderColor: 'black',
        paddingHorizontal: 10,
        fontSize: 16,
    },
    button: {
        width: 300,
        height: 58,
        borderRadius: 8,
    },
    labelText: {
        color: 'black',
        fontFamily: 'Poppins',
    },
    errorText: {
        color: 'red',
        fontSize: 12,
        marginTop: 4,
    },
});
