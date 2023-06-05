import React from 'react';
import { Box, Center, Heading, VStack, FormControl, Input, Button, Text,Link,HStack } from 'native-base';

const SignInScreen = () => {
    return <Center w="100%">
        <Box safeArea p="2" py="8" w="90%" maxW="290">
          
          <Heading mt="1" _dark={{
          color: "coolGray.800"
        }} color="warmGray" fontWeight="semibold" fontFamily={'Poppins-Medium'}>
            Sign in to continue!
          </Heading>
  
          <VStack space={3} mt="5">
            <FormControl>
              <FormControl.Label >Email ID</FormControl.Label>
              <Input />
            </FormControl>
            <FormControl>
              <FormControl.Label>Password</FormControl.Label>
              <Input type="password" />
              <Link _text={{
              fontSize: "xs",
              fontWeight: "500",
              color: "darkBlue.500"
            }} alignSelf="flex-end" mt="1">
                Forget Password?
              </Link>
            </FormControl>
            <Button mt="2" colorScheme="darkBlue" >
              Sign in
            </Button>
            <HStack mt="6" justifyContent="center">
              <Text fontSize="sm" color="coolGray.600" _dark={{
              color: "warmGray.200" 
            }} fontWeight='bold' fontFamily={'Poppins-Thin'}>
                I'm a new user.{" "}
              </Text>
              <Link _text={{
              color: "darkBlue.500",
              fontWeight: "medium",
              fontSize: "sm"
            }} href="#">
                Sign Up
              </Link>
            </HStack>
          </VStack>
        </Box>
      </Center>;
  };
  export default SignInScreen;