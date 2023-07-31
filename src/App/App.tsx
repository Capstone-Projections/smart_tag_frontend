import React, { useEffect, useState } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { allFonts } from '../resources/loadFont/fonts';
import { registerRootComponent } from 'expo';
import { NativeBaseProvider, Box } from 'native-base';
import { AppNavigator } from '../navigation/AppNavigation';
import { customTheme } from '../Theme';
import { AuthProvider } from '../context/AuthContext';
import { CourseProvider } from '../context/CourseContext';
import { QueryClient, QueryClientProvider } from 'react-query';
import AppLoading from 'expo-app-loading';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LessonProviderForLecturers } from '../context/LessonContextForLecturers';
import { LessonProvider } from '../context/LessonContext';
import { MenuProvider } from 'react-native-popup-menu';

// Create a client
const queryClient = new QueryClient();

export default function App() {
    const [fontsLoaded] = useFonts(allFonts());
    const [appReady, setAppReady] = useState(false);
    const [storedCredentials, setStoredCredntials] = useState('');

    useEffect(() => {
        async function prepare() {
            await SplashScreen.preventAutoHideAsync();
            setTimeout(async () => {
                await SplashScreen.hideAsync();
            }, 1500); // Delay of 1500 milliseconds (2 seconds)
        }
        prepare();
    }, []);

    if (!fontsLoaded) {
        return null;
    }

    return (
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <CourseProvider>
                    <LessonProvider>
                        <LessonProviderForLecturers>
                            <MenuProvider>
                                <NativeBaseProvider theme={customTheme}>
                                    <AppNavigator />
                                </NativeBaseProvider>
                            </MenuProvider>
                        </LessonProviderForLecturers>
                    </LessonProvider>
                </CourseProvider>
            </AuthProvider>
        </QueryClientProvider>
    );
}

registerRootComponent(App);
