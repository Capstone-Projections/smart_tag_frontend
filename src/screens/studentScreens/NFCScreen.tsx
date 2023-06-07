import { View, Text,Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';

const NFCScreen = () => {
  return (
    <SafeAreaView >
     <Image source={require('../../../assets/images/chip.png')}  style={{width: 400, height: 400}} />
    </SafeAreaView>
  )
}

export default NFCScreen;