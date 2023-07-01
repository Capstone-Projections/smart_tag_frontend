import { View } from 'react-native';
import { styles } from './styles';
import { Text } from 'react-native-paper';
import BarcodeScanner from '../../../components/Student/BarCodeScanner/BarCodeScanner';

export function QRCodeScreen() {
    return (
        <View style={styles.container}>
            <BarcodeScanner
                boxSize={200}
                boxPosition={{
                    top: '35%',
                    left: '-32%',
                    transform: [{ translateX: -50 }, { translateY: -50 }],
                }}
            />
            <Text style={styles.text}>
                Scan QR Code to take your Attendance
            </Text>
        </View>
    );
}
