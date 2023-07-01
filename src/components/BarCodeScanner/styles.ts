import { StyleSheet } from 'react-native';
import { Colors } from '../../screens/general/style';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    scannerContainer: {
        height: '50%',
        width: '80%',
        borderWidth: 2,
        borderColor: `${Colors.primary}`,
        borderRadius: 5,
        overflow: 'hidden',
    },
});
