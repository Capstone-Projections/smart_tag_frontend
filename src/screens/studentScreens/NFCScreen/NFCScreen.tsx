import { View, Text, Image, StyleSheet } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './styles';

const NFCScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            {/* <Image
                source={require('../../../assets/images/chip.png')}
                style={{ width: 400, height: 400 }}
            /> */}
        </SafeAreaView>
    );
};

export default NFCScreen;
