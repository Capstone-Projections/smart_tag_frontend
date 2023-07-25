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
        paddingHorizontal: 40,
        paddingVertical: 0,
        justifyContent: 'space-around',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    text: {
        fontSize: 25,
        textAlign: 'center',
        fontWeight: 'bold',
        fontFamily: 'Poppins',
        // padding: 10,
    },
    infoText: {
        fontSize: 15,
        textAlign: 'center',
        fontFamily: 'Poppins',
    },
    button: {
        // marginTop: 20,
        marginLeft: 20,
        width: '90%',
        height: 58,
        borderRadius: 8,
    },
    textContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        // paddingTop: 10,
    },
});
