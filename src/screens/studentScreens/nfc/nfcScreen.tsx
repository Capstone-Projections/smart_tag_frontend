import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const NFCScreen = ({}) => {
  return (
    <View style={styles.container}>
      <Text>NFC Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'blue',
  },
});

export default NFCScreen;
