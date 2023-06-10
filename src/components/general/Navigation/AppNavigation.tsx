import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import SignUpScreen from '../../../screens/general/SignUpScreen';
import SignInScreen from '../../../screens/general/SignInScreen';
import SetUpScreen from '../../../screens/studentScreens/SetUp';
import OTPScreen from '../../../screens/general/OTPScreen';
import TabBar from '../../../screens/general/BottomTabBar';
import CoursesList from '../Courses/Courses';
import NFCScreen from '../../../screens/studentScreens/NFCScreen';
import LecturerSetUpScreen from '../../../screens/lecturerScreens/LecturerSetup';
import LecturerBottomTabBar from '../../../screens/lecturerScreens/LecturerBottomTab';
import GetStarted from '../../../screens/general/GetStarted';
import LaunchScreen from '../../../screens/general/LaunchScreen';


const { Navigator, Screen } = createStackNavigator();

export const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="First"
      >
        <Screen name="Launch" component={LaunchScreen} />
        <Screen name="GetStarted" component={GetStarted}/>
        <Screen name="SetUp" component={SetUpScreen} />
        <Screen name="OTP" component={OTPScreen} />
        <Screen name="TabBar" component={TabBar} />
        <Screen name="Courses" component={CoursesList} />
        <Screen name="NFC" component={NFCScreen} />
        <Screen name="LecturerSetup" component={LecturerSetUpScreen} />
        
        
        
      
      </Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
