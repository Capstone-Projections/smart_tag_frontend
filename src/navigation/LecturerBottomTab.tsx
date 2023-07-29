import React from 'react';
import { View, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, BottomNavigation } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { CommonActions } from '@react-navigation/native';
import PeopleScreen from '../screens/Lecturer/People/PeopleScreen';
import Timetable from '../screens/general/Timetable/TimetableScreen';
import QuestScreen from '../screens/Lecturer/Quest/QuestScreen';
import { LessonProvider } from '../context/LessonContext';
import Analysis from '../screens/Lecturer/Analysis/Analysis';
import { LessonProviderForLecturers } from '../context/LessonContextForLecturers';

const Tab = createBottomTabNavigator();

export default function LecturerBottomTabBar() {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarStyle: styles.tabBar,
                tabBarActiveTintColor: 'blue',
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
                name="Quest"
                component={QuestScreen}
                options={{
                    tabBarLabel: 'Quest',
                    tabBarIcon: ({ color, size }) => {
                        return (
                            <Icon
                                name="account-question"
                                size={size}
                                color={color}
                            />
                        );
                    },
                }}
            />
            <Tab.Screen
                name="Analysis"
                component={Analysis}
                options={{
                    tabBarLabel: 'Analysis',
                    tabBarIcon: ({ color, size }) => {
                        return (
                            <Icon name="chart-bar" size={size} color={color} />
                        );
                    },
                }}
            />
            <Tab.Screen
                name="People"
                component={PeopleScreen}
                options={{
                    tabBarLabel: 'People',
                    tabBarIcon: ({ color, size }) => {
                        return (
                            <Icon
                                name="account-group"
                                size={size}
                                color={color}
                            />
                        );
                    },
                }}
            />
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    tabBar: {
        backgroundColor: 'white',
    },
});
