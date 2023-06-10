import React from 'react';
import { Box, Center, Heading, VStack, Button, Image } from 'native-base';


interface LoginScreenProps{
  navigation:any;
}



const LaunchScreen = (props:LoginScreenProps) => {
  const handleStudentPress=()=>
    props.navigation.navigate('GetStarted')
  const handleTeacherPress=()=>props.navigation.navigate('GetStarted')
  
  return (
    <Center flex={1} bg="white">
      <VStack space={5}>
        <Center>
          <Image source={
      require ("../../../assets/images/scott-graham-5fNmWej4tAA-unsplash.jpg")
    } alt="Alternate Text" style={{ width:300, height: 350 }} />
      <Heading size="lg" color="coolGray.800" _dark={{ color: 'warmGray.50' }} fontWeight="semibold" fontFamily={'Poppins-Medium'}>
          Welcome!
        </Heading>
        
        
        <Heading size="md" color="coolGray.800" _dark={{ color: 'warmGray.50' }} fontWeight="300">
          Are you a student or lecturer?
        </Heading>
        </Center>
        <Button colorScheme="darkBlue" onPress={handleStudentPress} >
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