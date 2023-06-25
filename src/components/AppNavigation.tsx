import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import TabBar from '../screens/general/BottomTabBar';
import CoursesList from './general/Courses/Courses';
import NFCScreen from '../screens/studentScreens/NFCScreen';
import LecturerSetUpScreen from '../screens/lecturerScreens/LecturerSetUpScreen';
import LecturerBottomTabBar from '../screens/lecturerScreens/LecturerBottomTab';
import GetStarted from '../screens/general/GetStarted';
import LaunchScreen from '../screens/general/LaunchScreen';
import DrawerNavigation from './DrawerNavigation';
import AddCourse from '../screens/studentScreens/AddCourseScreen';
import Login from '../screens/general/Login';
import StudentSetUpScreen from '../screens/studentScreens/StudentSetUpScreen';
import LecturerDrawer from '../screens/lecturerScreens/LecturerDrawer';
import LecturerCoursesList from '../screens/lecturerScreens/LecturerCoursesList';
import OTPVerificationScreen from '../screens/general/OTP';
import Timetable from '../screens/general/TimetableScreen';
import ViewAttendance from '../screens/general/ViewAttendance';
import LecturerTimetable from '../screens/lecturerScreens/LecturerTimetable';




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
        <Screen name="GetStarted" component={GetStarted}/>
        <Screen name="SetUp" component={StudentSetUpScreen} />
        <Screen name="TabBar" component={TabBar} />
        <Screen name="Courses" component={CoursesList} />
        <Screen name="NFC" component={NFCScreen} />
        <Screen name="LecturerSetUp" component={LecturerSetUpScreen} />
        <Screen name="LecturerSetup" component={LecturerSetUpScreen} />
        <Screen name="LecturerBottomTab" component={LecturerBottomTabBar} />
        <Screen name="Drawer" component={DrawerNavigation} />
        <Screen name="Login" component={Login} />
        <Screen name="AddCourse" component={AddCourse} />
        <Screen name="LecturerDrawer" component={LecturerDrawer} />
        <Screen name="LecturerCoursesList" component={LecturerCoursesList} />
        <Screen name="OTP" component={OTPVerificationScreen} />
        <Screen name="Time" component={Timetable} />
        <Screen name="View" component={ViewAttendance} />
        <Screen name="LecturerTimetable" component={LecturerTimetable} />
       
        

        

        


        </Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
