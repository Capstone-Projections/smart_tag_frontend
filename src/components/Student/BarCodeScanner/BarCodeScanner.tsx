import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import {
    BarCodeScanner,
    PermissionStatus,
    requestPermissionsAsync,
} from 'expo-barcode-scanner';
import { styles } from './styles';
import { BarcodeScannerProps } from './props';
import { Colors } from '../../../screens/general/OTP/styles';
import { Button } from 'native-base';

const BarcodeScanner: React.FC<BarcodeScannerProps> = ({
    boxSize,
    // boxPosition,
    onQRCodeScanned,
}) => {
    const [hasPermission, setHasPermission] = useState<PermissionStatus | null>(
        null
    );
    const [scanned, setScanned] = useState<boolean>(false);
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
            {/* <Text style={{fontSize: 50}}>Hello</Text> */}
            <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={[
                    // StyleSheet.absoluteFillObject,
                    styles.scannerContainer,
                    // boxPosition as StyleProp<ViewStyle>,
                ]}
            >
                <View
                    style={{
                        width: '100%',
                        height: '100%',
                        borderColor: `${Colors.primary}`,
                        borderWidth: 5,
                    }}
                >
                    {/* <Text></Text> */}
                </View>
            </BarCodeScanner>
            {/* {scanned && ( */}
            <Button
                colorScheme="darkBlue"
                style={scanned ? styles.buttonOutline : styles.buttonInactive}
                disabled={!scanned}
                variant="contained"
                onPress={() => setScanned(false)}
            >
                <Text style={styles.buttonText}>Scan Again!</Text>
            </Button>
            {/* )} */}
        </View>
    );
};

export default BarcodeScanner;
