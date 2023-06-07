import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import LaunchScreen from '../../../screens/general/LaunchScreen';
import SignUpScreen from '../../../screens/general/SignUpScreen';
import SignInScreen from '../../../screens/general/SignInScreen';
import SetUpScreen from '../../../screens/studentScreens/SetUp';
import OTPScreen from '../../../screens/general/OTPScreen';


import TabBar from '../../../screens/general/BottomTabBar';
import CoursesList from '../Courses/Courses';
import NFCScreen from '../../../screens/studentScreens/NFCScreen';



const { Navigator, Screen } = createStackNavigator();

export const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="Launch"
      >
        <Screen name="Launch" component={LaunchScreen} />
        <Screen name="SignUp" component={SignUpScreen} />
        <Screen name="SignIn" component={SignInScreen} />
        <Screen name="SetUp" component={SetUpScreen} />
        <Screen name="OTP" component={OTPScreen} />
        <Screen name="TabBar" component={TabBar} />
        <Screen name="Courses" component={CoursesList} />
        <Screen name="NFC" component={NFCScreen} />
      
        
        
        
        
      </Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
