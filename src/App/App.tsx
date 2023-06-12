
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { View, SafeAreaView, StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { allFonts } from '../resources/loadFont/fonts';
import { Text } from '../components/general/Text/AppText';
import { Button } from '../components/general/Button';
import { Entry } from '../components/general/Entry/AppEntry';
import { registerRootComponent } from 'expo';
import { NativeBaseProvider, Box } from 'native-base';
import { AppWrapper } from '../styles/AppWrapper';
import { AppNavigator } from '../components/AppNavigation';
import LaunchScreen from '../screens/general/LaunchScreen';
import { customTheme } from '../Theme';






export default function App() {
  const [fontsloaded] = useFonts(allFonts());

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, []);

  if (!fontsloaded) {
    return null;
  } else {
    SplashScreen.hideAsync();
  }

  return (
    
      <NativeBaseProvider theme={customTheme}> 
      <AppNavigator/>
     </NativeBaseProvider> 
    
  );
}



registerRootComponent(App);
