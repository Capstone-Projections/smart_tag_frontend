import { StyleSheet } from 'react-native';

export const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    imageContainer: {
        marginTop: 0,
        justifyContent: 'center',
        borderRadius: 10,
        margin: 10,
        alignItems: 'center',
    },
    image: {
        width: 414,
        height: 450,
        borderRadius: 10,
        alignItems: 'center',
        margin: 0,
    },
    textFirst: {
        fontSize: 28,
        textAlign: 'center',
        fontFamily: 'Poppins',
    },
    textSecond: {
        fontSize: 21,
        fontWeight: '300',
        textAlign: 'center',
        fontFamily: 'Poppins',
    },
    button: {
        width: 300,
        height: 58,
        borderRadius: 8,
    },
});
