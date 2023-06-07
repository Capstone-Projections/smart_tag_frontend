import React from 'react';
import { Box, Center, Heading, VStack, FormControl, Input, Button, Text,Link,HStack } from 'native-base';
import { SafeAreaView } from 'react-native-safe-area-context';

interface SignInScreenProps{
  navigation: any
}

const SignInScreen = (props: SignInScreenProps) => {
  const handleSignInPress=()=>
  props.navigation.navigate('SetUp')
    return (
    <SafeAreaView style={{padding:60}}>
    <Center w="100%">
        <Box safeArea p="2" py="8" w="90%" maxW="290">
          <Heading style={{textAlign:'left'}} mt="1" _dark={{
          color: "coolGray.800"
        }} color="warmGray" fontWeight="semibold" fontFamily={'Poppins-Medium'}>
            Sign in!
          </Heading>
  
          <VStack space={3} mt="5">
            <FormControl>
              <FormControl.Label >Email ID</FormControl.Label>
              <Input />
            </FormControl>
            <FormControl>
              <FormControl.Label>Password</FormControl.Label>
              <Input type="password" />
              </FormControl>
            <Button mt="2" colorScheme="darkBlue" onPress={handleSignInPress}>
              Sign in
            </Button>
            <HStack mt="6" justifyContent="center">
             
            </HStack>
          </VStack>
        </Box>
      </Center>
      </SafeAreaView>
    )
  };
  export default SignInScreen;