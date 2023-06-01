import React, { useEffect } from 'react';
import { View } from 'react-native';
import { styles } from '../styles/appStyles/App.stylesheet';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { allFonts } from '../resources/loadFont/fonts';
import { Text } from '../components/general/Text/AppText';
import { Button } from '../components/general/Button';
import { Entry } from '../components/general/Entry/AppEntry';
import { registerRootComponent } from 'expo';
import { OTP } from '../components/general/OTP/AppOTP';
import { LaunchScreen } from '../screens/general screens/launchScreen/launchScreen';
import { SignInScreen } from '../screens/general screens/signInScreen/signInScreen';
import { SignUpWrapper } from '../screens/signUpScreen/styles';
import SignUpScreen from '../screens/signUpScreen/SignUpScreen';

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
    <View style={styles.container}>
      <SignUpScreen/>
    </View>
  );
}

registerRootComponent(App);
