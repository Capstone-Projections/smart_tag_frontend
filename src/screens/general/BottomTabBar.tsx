import React from 'react';
import { View, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, BottomNavigation, List } from 'react-native-paper';
import { CommonActions } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import NFCScreen from '../studentScreens/NFCScreen';
import Timetable from './TimetableScreen';
import { QRCodeScreen } from '../studentScreens/QRCodeScreen/QrCodeScreen';

const Tab = createBottomTabNavigator();

export default function TabBar() {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
            }}
            tabBar={({ navigation, state, descriptors, insets }) => (
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
                            <Icon name="timetable" size={size} color={color} />
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
                        return <Icon name="nfc" size={size} color={color} />;
                    },
                }}
            />
            <Tab.Screen
                name="QRCode"
                component={QRCodeScreen}
                options={{
                    tabBarLabel: 'QRCode',
                    tabBarIcon: ({ color, size }) => {
                        return <Icon name="qrcode" size={size} color={color} />;
                    },
                }}
            />
        </Tab.Navigator>
    );
}
