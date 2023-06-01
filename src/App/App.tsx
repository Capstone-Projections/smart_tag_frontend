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
import { LaunchScreen } from '../screens/general/launchScreen/launchScreen';
import { SignInScreen } from '../screens/general/signInScreen/signInScreen';
import SignUpScreen from '../screens/general/signUpScreen/SignUpScreen';
import { NativeBaseProvider,Box } from 'native-base';

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
    <NativeBaseProvider>
      <View style={styles.container}>
        <Box bg="primary.500" w="100%" p={4} color="white"></Box>
      </View>
    </NativeBaseProvider>
  );
}
//this is testing that native base actually works in the project, you can remove it to test any of the pages that you want to, but make sure that you keep the content inside of the NativeBaseProvider P.S: remove this comment after you're done removing
registerRootComponent(App);
