import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import {
    BarCodeScanner,
    PermissionStatus,
    requestPermissionsAsync,
} from 'expo-barcode-scanner';
import { styles } from './styles';
import { BarcodeScannerProps } from './props';

import { Button } from 'native-base';
import { SafeAreaView } from 'react-native-safe-area-context';
// import { Colors } from '../../general/Inputfield/style';

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
        return (
            <View
                style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    flex: 1,
                }}
            >
                <Text>Requesting for camera permission</Text>
            </View>
        );
    }
    if (hasPermission === 'denied') {
        return (
            <View
                style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    flex: 1,
                }}
            >
                <Text>No Access To Camera</Text>
            </View>
        );
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white', padding: 5 }}>
            {/* <Text style={{fontSize: 50}}>Hello</Text> */}
            <View style={styles.content}>
                <View style={styles.barCodeWrappper}>
                    <BarCodeScanner
                        onBarCodeScanned={
                            scanned ? undefined : handleBarCodeScanned
                        }
                        style={{ width: '100%', height: '100%' }}
                    >
                        <View
                            style={{
                                width: '100%',
                                height: '100%',
                                borderColor: '#196B9A',
                                borderWidth: 5,
                                borderRadius: 15,
                            }}
                        >
                            {/* <Text></Text> */}
                        </View>
                    </BarCodeScanner>
                </View>
                {/* {scanned && ( */}
                <Button
                    colorScheme="darkBlue"
                    style={
                        scanned ? styles.buttonOutline : styles.buttonInactive
                    }
                    disabled={!scanned}
                    variant="contained"
                    onPress={() => setScanned(false)}
                >
                    <Text style={styles.buttonText}>Scan Again!</Text>
                </Button>
            </View>
            {/* )} */}
        </SafeAreaView>
    );
};

export default BarcodeScanner;
