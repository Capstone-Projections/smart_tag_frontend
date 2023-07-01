import { View } from 'react-native';
import { styles } from './styles';
import { Text } from 'react-native-paper';
import BarcodeScanner from '../../../components/BarCodeScanner/BarCodeScanner';

export function QRCodeScreen() {
    return (
        <View style={styles.container}>
            <BarcodeScanner
                boxSize={200}
                boxPosition={{
                    top: '35%',
                    left: '-27%',
                    transform: [{ translateX: -50 }, { translateY: -50 }],
                }}
            />
        </View>
    );
}
