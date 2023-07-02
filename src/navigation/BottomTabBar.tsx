import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomNavigation } from 'react-native-paper';
import { CommonActions } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import NFCScreen from '../screens/studentScreens/NFCScreen';
import Timetable from '../screens/general/Timetable/TimetableScreen';
import { QRCodeScreen } from '../screens/studentScreens/QRCodeScreen/QrCodeScreen';
import { TimetableDaysProvider } from '../context/TimeTableContext';
import { LessonProvider } from '../context/LessonContext';
import { LessonRoomProvider } from '../context/LectureRoomContext';

const Tab = createBottomTabNavigator();

export default function TabBar() {
    return (
        <TimetableDaysProvider>
            <LessonProvider>
                <LessonRoomProvider>
                    <Tab.Navigator
                        screenOptions={{
                            headerShown: false,
                        }}
                        tabBar={({
                            navigation,
                            state,
                            descriptors,
                            insets,
                        }) => (
                            <BottomNavigation.Bar
                                navigationState={state}
                                safeAreaInsets={insets}
                                onTabPress={({ route, preventDefault }) => {
                                    const event = navigation.emit({
                                        type: 'tabPress',
                                        target: route.key,
                                        canPreventDefault: true,
                                    });

                                    if (event.defaultPrevented) {
                                        preventDefault();
                                    } else {
                                        navigation.dispatch({
                                            ...CommonActions.navigate(
                                                route.name,
                                                route.params
                                            ),
                                            target: state.key,
                                        });
                                    }
                                }}
                                renderIcon={({ route, focused, color }) => {
                                    const { options } = descriptors[route.key];
                                    if (options.tabBarIcon) {
                                        return options.tabBarIcon({
                                            focused,
                                            color,
                                            size: 24,
                                        });
                                    }

                                    return null;
                                }}
                                getLabelText={({ route }) => {
                                    const { options } = descriptors[route.key];
                                    const label =
                                        options.tabBarLabel !== undefined
                                            ? options.tabBarLabel
                                            : options.title !== undefined
                                            ? options.title
                                            : route.name;

                                    return label as string;
                                }}
                            />
                        )}
                    >
                        <Tab.Screen
                            name="Timetable"
                            component={Timetable}
                            options={{
                                tabBarLabel: 'Timetable',
                                tabBarIcon: ({ color, size }) => {
                                    return (
                                        <Icon
                                            name="timetable"
                                            size={size}
                                            color={color}
                                        />
                                    );
                                },
                            }}
                        />
                        <Tab.Screen
                            name="NFC"
                            component={NFCScreen}
                            options={{
                                tabBarLabel: 'NFC',
                                tabBarIcon: ({ color, size }) => {
                                    return (
                                        <Icon
                                            name="nfc"
                                            size={size}
                                            color={color}
                                        />
                                    );
                                },
                            }}
                        />
                        <Tab.Screen
                            name="QRCode"
                            component={QRCodeScreen}
                            options={{
                                tabBarLabel: 'QRCode',
                                tabBarIcon: ({ color, size }) => {
                                    return (
                                        <Icon
                                            name="qrcode"
                                            size={size}
                                            color={color}
                                        />
                                    );
                                },
                            }}
                        />
                    </Tab.Navigator>
                </LessonRoomProvider>
            </LessonProvider>
        </TimetableDaysProvider>
    );
}
