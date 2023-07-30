import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import TabBar from './BottomTabBar';
import CoursesList from '../components/general/Courses/Courses';
import NFCScreen from '../screens/studentScreens/NFCScreen/NFCScreen';
import LecturerSetUpScreen from '../screens/Lecturer/SetUp/LecturerSetUpScreen';
import LecturerBottomTabBar from './LecturerBottomTab';
import GetStarted from '../screens/general/GetStarted/GetStarted';
import DrawerNavigation from './DrawerNavigation';
import AddCourse from '../screens/studentScreens/AddCourse/AddCourseScreen';
import StudentSetUpScreen from '../screens/studentScreens/StudentSetUpScreen';

import Timetable from '../screens/general/Timetable/TimetableScreen';
import ViewAttendance from '../screens/general/Attendance/ViewAttendance';
import PeopleScreen from '../screens/Lecturer/People/PeopleScreen';
import ManualScreen from '../screens/Lecturer/ManualScreen';
import ProfileScreen from '../screens/general/Profile/ProfileScreen';
import QuestScreen from '../screens/Lecturer/Quest/QuestScreen';
import CreateCourse from '../screens/Lecturer/CreateCourse/CreateCourse';
import LoginScreen from '../screens/general/LoginScreen/LoginScreen';
import OTPScreen from '../screens/general/OTPScreen/OTPScreen';
import Welcome from '../screens/general/WelcomeScreen/Welcome';
import EditLesson from '../screens/Lecturer/EditLessonScreen/EditLesson';

import NewUserScreen from '../screens/general/NewUser/NewUserScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { Navigator, Screen } = createStackNavigator();

const useAuthorization = () => {
    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
        const checkAuthorization = async () => {
            try {
                // Fetch the authorization key from local storage
                const authorizationKey = await AsyncStorage.getItem(
                    'authorizationKey'
                );

                // If the authorization key exists, the user is authorized
                setIsAuthorized(!!authorizationKey);
                console.log(authorizationKey);
            } catch (error) {
                // Handle error
                console.error('Error fetching authorization key:', error);
            }
        };

        checkAuthorization();
    }, []);

    return isAuthorized;
};

//TODO: make sure to use some form of protected routes
export const AppNavigator = () => {
    const isAuthorized = useAuthorization();

    return (
        <NavigationContainer>
            <Navigator
                screenOptions={{ headerShown: false }}
                initialRouteName={isAuthorized ? 'Drawer' : 'Welcome'}
            >
                <Screen name="Welcome" component={Welcome} />
                <Screen name="GetStarted" component={GetStarted} />
                <Screen name="SetUp" component={StudentSetUpScreen} />
                <Screen name="TabBar" component={TabBar} />
                <Screen name="Courses" component={CoursesList} />
                <Screen name="NFC" component={NFCScreen} />
                <Screen name="LecturerSetUp" component={LecturerSetUpScreen} />
                <Screen name="LecturerSetup" component={LecturerSetUpScreen} />
                <Screen
                    name="LecturerBottomTab"
                    component={LecturerBottomTabBar}
                />
                <Screen name="Drawer" component={DrawerNavigation} />
                <Screen name="AddCourse" component={AddCourse} />

                <Screen name="Time" component={Timetable} />
                <Screen name="View" component={ViewAttendance} />
                <Screen name="People" component={PeopleScreen} />
                <Screen name="Manual" component={ManualScreen} />
                <Screen name="Profile" component={ProfileScreen} />
                <Screen name="Quest" component={QuestScreen} />
                <Screen name="CreateCourse" component={CreateCourse} />
                <Screen name="LoginScreen" component={LoginScreen} />
                <Screen name="OTPScreen" component={OTPScreen} />
                <Screen name="EditLesson" component={EditLesson} />
                <Screen name="NewUser" component={NewUserScreen} />
            </Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;
