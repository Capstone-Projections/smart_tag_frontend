import React , { useEffect} from 'react';
import {Text,View} from 'react-native';
import {styles} from '../styles/appStyles/App.stylesheet';
import { AppText } from '../components/general/Text';
import {useFonts} from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { allFonts } from '../resources/loadFont/fonts';




export default function App() {

  const [fontsloaded] = useFonts (allFonts());


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

