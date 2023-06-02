import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const QRCodeScreen = ({}) => {
  return (
    <View style={styles.container}>
      <Text>QR code Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'green',
  },
});

export default QRCodeScreen;
