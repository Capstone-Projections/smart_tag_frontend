import React , { useEffect} from 'react';
import {Text,View} from 'react-native';
import {styles} from './App.stylesheet';
import { AppText } from '../components/general/Text';
import {useFonts} from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';




export default function App() {

  const [fontsloaded] = useFonts ({
    'Poppins': require('../../assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Bold': require('../../assets/fonts/Poppins-Bold.ttf'),
    'Poppins-ExtraBold': require('../../assets/fonts/Poppins-ExtraBold.ttf'),
    'Poppins-ExtraLight': require('../../assets/fonts/Poppins-ExtraLight.ttf'),
    'Poppins-Light': require('../../assets/fonts/Poppins-Light.ttf'),
    'Poppins-Medium': require('../../assets/fonts/Poppins-Medium.ttf'),
    'Poppins-SemiBold': require('../../assets/fonts/Poppins-SemiBold.ttf'),
    'Poppins-Thin': require('../../assets/fonts/Poppins-Thin.ttf'),
  })


  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  },[]);

  if(!fontsloaded){
    return null;
  }else{
    SplashScreen.hideAsync();
  }

  return (
    <View  style = {styles.container}>
    <AppText>Hey What's up</AppText>
    </View>
    
  );
}

