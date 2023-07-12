import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useCallback } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './styles';
import useNfcTagReader from '../../../hooks/NFC/useNFCTagReader';

const NFCScreen = () => {
    const tagData = useNfcTagReader();

    const handlePress = useCallback(() => {
        if (!tagData) {
            useNfcTagReader();
        }
    }, [tagData]);

    return (
        <View style={styles.wrapper}>
            <TouchableOpacity onPress={handlePress}>
                <Text>{tagData ? 'Scanning NFC Tag...' : 'Scan a Tag'}</Text>
            </TouchableOpacity>

            {tagData && (
                <View style={styles.tagContainer}>
                    <Text style={styles.tagText}>Tag found:</Text>
                    <Text style={styles.tagText}>{tagData}</Text>
                </View>
            )}
        </View>
    );
};

export default NFCScreen;
