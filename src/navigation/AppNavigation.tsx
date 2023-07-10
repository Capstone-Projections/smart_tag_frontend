import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import TabBar from './BottomTabBar';
import CoursesList from '../components/general/Courses/Courses';
import NFCScreen from '../screens/studentScreens/NFCScreen';
import LecturerSetUpScreen from '../screens/Lecturer/SetUp/LecturerSetUpScreen';
import LecturerBottomTabBar from './LecturerBottomTab';
import GetStarted from '../screens/general/GetStarted/GetStarted';
import LaunchScreen from '../screens/general/LaunchScreen/LaunchScreen';
import DrawerNavigation from './DrawerNavigation';
import AddCourse from '../screens/studentScreens/AddCourseScreen';
import Login from '../screens/general/Login/Login';
import StudentSetUpScreen from '../screens/studentScreens/StudentSetUpScreen';
import OTPVerificationScreen from '../screens/general/OTP/OTP';
import Timetable from '../screens/general/Timetable/TimetableScreen';
import ViewAttendance from '../screens/general/Attendance/ViewAttendance';
import PeopleScreen from '../screens/Lecturer/People/PeopleScreen';
import ManualScreen from '../screens/Lecturer/ManualScreen';
import ProfileScreen from '../screens/general/Profile/ProfileScreen';
import QuestScreen from '../screens/Lecturer/Quest/QuestScreen';

const { Navigator, Screen } = createStackNavigator();

//TODO: make sure to use some form of protected routes
export const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Navigator
                screenOptions={{ headerShown: false }}
                initialRouteName="Launch"
            >
                <Screen name="Launch" component={LaunchScreen} />
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
                <Screen name="Login" component={Login} />
                <Screen name="AddCourse" component={AddCourse} />

                <Screen name="OTP" component={OTPVerificationScreen} />
                <Screen name="Time" component={Timetable} />
                <Screen name="View" component={ViewAttendance} />
                <Screen name="People" component={PeopleScreen} />
                <Screen name="Manual" component={ManualScreen} />
                <Screen name="Profile" component={ProfileScreen} />
                <Screen name="Quest" component={QuestScreen} />
            </Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;
