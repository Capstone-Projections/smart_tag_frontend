import React from 'react';
import { Box, Center, Heading, VStack, FormControl, Input, Button, Image } from 'native-base';
import { SafeAreaView } from 'react-native-safe-area-context';

interface SignUpScreenProps {
  navigation: any;
}

const SignUpScreen = (props: SignUpScreenProps) => {
  const handleSignUpPress = () => props.navigation.navigate('SignIn');

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Center flex={1}>
        <Box safeArea p="2" w="90%" maxW="290" py="8">
          <VStack space={3} alignItems="center">
            <Image
              source={
                require ("../../../assets/images/scott-graham-5fNmWej4tAA-unsplash.jpg")
              }
              alt="Logo"
              size="xl"
              borderRadius={8} 
              mb={3}
            />
            <Heading color="coolGray.800" _dark={{ color: "warmGray.200" }} fontWeight="semibold" fontFamily={'Poppins-Medium'} >
              Welcome to Smart Tag!
            </Heading>
            <FormControl>
              <FormControl.Label>Email</FormControl.Label>
              <Input />
            </FormControl>
            <Button colorScheme="darkBlue" onPress={handleSignUpPress}>
              Submit for OTP code
            </Button>
          </VStack>
        </Box>
      </Center>
    </SafeAreaView>
  );
};

export default SignUpScreen;
