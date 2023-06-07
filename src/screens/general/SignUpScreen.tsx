import React from 'react';
import { Box, Center, Heading, VStack, FormControl, Input, Button } from 'native-base';
import { SafeAreaView } from 'react-native-safe-area-context';

interface SignUpScreenProps{
  navigation: any
}

const SignUpScreen = (props: SignUpScreenProps) => {
  const handleSignUpPress=()=>
  props.navigation.navigate('SignIn')
  return (
    <SafeAreaView style={{padding:60}}>
    <Center w="100%">
      <Box safeArea p="2" w="90%" maxW="290" py="8">
       <Heading mt="1" color="coolGray.800" _dark={{ color: "warmGray.200" }} fontWeight="semibold" fontFamily={'Poppins-Medium'}>
          Sign up now!
        </Heading>
        <VStack space={3} mt="5">
          <FormControl>
            <FormControl.Label >Email</FormControl.Label>
            <Input />
          </FormControl>
          <FormControl>
            <FormControl.Label>Password</FormControl.Label>
            <Input type="password" />
          </FormControl>
          <FormControl>
            <FormControl.Label>Confirm Password</FormControl.Label>
            <Input type="password" />
          </FormControl>
          <Button mt="2" colorScheme="darkBlue" onPress={handleSignUpPress}>
            Sign up
          </Button>
        </VStack>
      </Box>
    </Center>
    </SafeAreaView>
  );
};

export default SignUpScreen;
