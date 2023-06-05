import React from 'react';
import { Box, Center, Heading, VStack, Button } from 'native-base';
import SignUpScreen from './SignUpScreen';
import { createStackNavigator } from '@react-navigation/stack';

interface LoginScreenProps{
  navigation:any;
}



const LaunchScreen = (props:LoginScreenProps) => {
  const handleStudentPress=()=>
    props.navigation.navigate('SignUp')
  const handleTeacherPress=()=>props.navigation.navigate('SignUp')
  
  return (
    <Center flex={1} bg="white">
      <VStack space={5}>
        <Heading size="lg" color="coolGray.800" _dark={{ color: 'warmGray.50' }} fontWeight="semibold">
          Welcome
        </Heading>
        <Heading size="md" color="coolGray.800" _dark={{ color: 'warmGray.50' }} fontWeight="medium">
          Are you a student or lecturer?
        </Heading>
        <Button colorScheme="darkBlue" onPress={handleStudentPress}>
          Student
        </Button>
        <Button colorScheme="darkBlue" onPress={handleTeacherPress}>
          Lecturer
        </Button>
      </VStack>
    </Center>
  );
};

export default LaunchScreen;