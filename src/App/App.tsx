import React , { useEffect} from 'react';
import {View} from 'react-native';
import {styles} from '../styles/appStyles/App.stylesheet';
import {useFonts} from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { allFonts } from '../resources/loadFont/fonts';
import { Text } from '../components/general/Text/AppText';
import { Button } from '../components/general/Button';
import { AppEntry } from '../components/general/Entry/AppEntry';



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
  
    <AppEntry text='Sign Up' textWeight='bold' placeholder='Sign here'></AppEntry>

    </View>
    
  );
}

