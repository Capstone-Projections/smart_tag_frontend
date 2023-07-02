import { View } from 'react-native';
import { styles } from './styles';
import { Text } from 'react-native-paper';
import BarcodeScanner from '../../../components/Student/BarCodeScanner/BarCodeScanner';
import { LessonProvider } from '../../../context/LessonContext';

export function QRCodeScreen() {
    return (
        <LessonProvider>
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
        </LessonProvider>
    );
}
