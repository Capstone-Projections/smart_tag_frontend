import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { View, SafeAreaView, StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { allFonts } from '../resources/loadFont/fonts';
import { registerRootComponent } from 'expo';
import { NativeBaseProvider, Box } from 'native-base';
import { AppWrapper } from '../styles/AppWrapper';
import { AppNavigator } from '../components/AppNavigation';
import LaunchScreen from '../screens/general/LaunchScreen';
import { customTheme } from '../Theme';
import { AuthProvider } from '../components/AuthContext';

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
        <AuthProvider>
            <NativeBaseProvider theme={customTheme}>
                <AppNavigator />
            </NativeBaseProvider>
        </AuthProvider>
    );
}

registerRootComponent(App);
