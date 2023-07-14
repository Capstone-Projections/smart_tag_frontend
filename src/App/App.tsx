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

// Create a client
const queryClient = new QueryClient();

export default function App() {
    const [fontsLoaded] = useFonts(allFonts());
    const [appReady, setAppReady] = useState(false);
    const [storedCredentials, setStoredCredntials] = useState('');

    // const checkLoginCredentials = () => {
    //     AsyncStorage.getItem('loginCredentials')
    //         .then(results => {
    //             if (results !== null) {
    //                 setStoredCredntials(JSON.parse(results));
    //             } else {
    //                 setStoredCredntials('');
    //             }
    //         })
    //         .catch();
    // };

    // if (!appReady) {
    //     return (
    //         <AppLoading
    //             startAsync={checkLoginCredentials}
    //             onFinish={() => setAppReady(true)}
    //             onError={console.warn}
    //         />
    //     );
    // }

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
                    <NativeBaseProvider theme={customTheme}>
                        <AppNavigator />
                    </NativeBaseProvider>
                </CourseProvider>
            </AuthProvider>
        </QueryClientProvider>
    );
}

registerRootComponent(App);
