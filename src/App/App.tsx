import React , { useState } from 'react';
import {Text,View} from 'react-native';
import {styles} from './App.stylesheet';
import { AppText } from '../components/general/Text';
import  {loadFonts}  from './font'
import Apploading from "expo-app-loading";


export default function App() {
  const [fontsloaded, setFontsLoaded] = useState(false);
  if (fontsloaded) {
  return (

    <View  style = {styles.container}>
      <Text >
    Hello Heading 1
    </Text>
    <AppText>Hey What's up</AppText>
    </View>
    
  );}
  else {
    return (
      <Apploading
        startAsync={loadFonts}
        onFinish={() => {
          setFontsLoaded(true);
        }}
        onError={console.warn}
      />
    );
  }
}

