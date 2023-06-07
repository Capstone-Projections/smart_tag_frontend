import { View, Text,Image,StyleSheet } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';

const NFCScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
     <Image source={require('../../../assets/images/chip.png')}  style={{width: 400, height: 400}} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    
  });

export default NFCScreen;