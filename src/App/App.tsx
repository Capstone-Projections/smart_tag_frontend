import React, { useEffect } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { allFonts } from '../resources/loadFont/fonts';
import { registerRootComponent } from 'expo';
import { NativeBaseProvider, Box } from 'native-base';
import { AppNavigator } from '../navigation/AppNavigation';
import { customTheme } from '../Theme';
import { AuthProvider } from '../context/AuthContext';
import { CourseProvider } from '../context/CourseContext';

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
            <CourseProvider>
                <NativeBaseProvider theme={customTheme}>
                    <AppNavigator />
                </NativeBaseProvider>
            </CourseProvider>
        </AuthProvider>
    );
}

registerRootComponent(App);
