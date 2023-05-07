import React , { useState } from 'react';
import {Text,View} from 'react-native';
import {styles} from './App.stylesheet';
import { AppText } from '../components/general/Text';
import {useFonts} from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';


export default function App() {

  return (
    <View  style = {styles.container}>
      <Text >
    Hello Heading 1
    </Text>
    <AppText>Hey What's up</AppText>
    </View>
    
  );
}

