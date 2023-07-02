import React, { useState, useEffect } from 'react';
import {
    Text,
    View,
    StyleSheet,
    Button,
    ViewStyle,
    StyleProp,
} from 'react-native';
import {
    BarCodeScanner,
    PermissionStatus,
    requestPermissionsAsync,
} from 'expo-barcode-scanner';
import { styles } from './styles';
import { BarcodeScannerProps } from './props';

const BarcodeScanner: React.FC<BarcodeScannerProps> = ({
    boxSize,
    boxPosition,
    onQRCodeScanned,
}) => {
    const [hasPermission, setHasPermission] = useState<PermissionStatus | null>(
        null
    );
    const [scanned, setScanned] = useState(false);
    //get the permission status
    useEffect(() => {
        const getBarCodeScannerPermissions = async () => {
            const { status } = await requestPermissionsAsync();
            setHasPermission(status);
        };

        getBarCodeScannerPermissions();
    }, []);

    const handleBarCodeScanned = ({
        type,
        data,
    }: {
        type: string;
        data: string;
    }) => {
        setScanned(true);
        onQRCodeScanned(data);
    };

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === 'denied') {
        return <Text>No access to camera</Text>;
    }

    return (
        <View style={styles.container}>
            <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={[
                    StyleSheet.absoluteFillObject,
                    styles.scannerContainer,
                    boxPosition as StyleProp<ViewStyle>,
                ]}
            />
            {scanned && (
                <Button
                    title={'Tap to Scan Again'}
                    onPress={() => setScanned(false)}
                />
            )}
        </View>
    );
};

export default BarcodeScanner;
