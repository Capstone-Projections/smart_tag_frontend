import React from 'react';
import {Text,View} from 'react-native';
import {styles} from './App.stylesheet';
import { AppText } from '../components/general/Text';



export default function App() {
  return (

    <View  style = {styles.container}>
      <Text >
    Hello Heading 1
    </Text>
    <AppText.Subtitle>Hey What's up</AppText.Subtitle>
    </View>
    
  );
}

