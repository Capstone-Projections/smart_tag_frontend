import { StyleSheet } from 'react-native';
import { Colors } from '../../../screens/general/OTP/styles';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        // flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'red',
        // width: '100%',
        // height: '100%',
    },
    scannerContainer: {
        height: 350,
        width: 350,
        borderRadius: 5,
        overflow: 'hidden',
        // backgroundColor: 'blue',
    },
    buttonOutline: {
        width: 140,
        height: 50,
        borderRadius: 4,
        // borderColor: `${Colors.primary}`,
        backgroundColor: `${Colors.primary}`,
        marginTop: 20,
    },
    buttonInactive: {
        width: 140,
        height: 50,
        borderRadius: 4,

        marginTop: 20,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
    },
});
