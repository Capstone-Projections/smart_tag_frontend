import { StyleSheet } from 'react-native';
// import { Colors } from '../../general/inputfield/style';

export const styles = StyleSheet.create({
    content: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    barCodeWrappper: {
        // flex: 1,
        // flexDirection: 'column',
        // justifyContent: 'center',
        // alignItems: 'center',
        // backgroundColor: 'red',
        height: 350,
        width: 255,
        // width: '100%',
        // width: 350,
        // height: 250,
        // overflow: 'hidden',
    },
    buttonOutline: {
        width: 140,
        height: 50,
        borderRadius: 4,
        // borderColor: `${Colors.primary}`,
        backgroundColor: '#196B9A',
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
