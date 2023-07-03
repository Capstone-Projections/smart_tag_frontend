import { StyleSheet } from 'react-native';
import { Colors } from '../../../screens/general/OTP/styles';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    scannerContainer: {
        height: '80%',
        width: '90%',
        borderWidth: 5,
        borderColor: `${Colors.primary}`,
        borderRadius: 5,
        overflow: 'hidden',
    },
});
