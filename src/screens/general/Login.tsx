import { View, Text, StyleSheet, Image } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FormControl, Input, Button, VStack, Link, KeyboardAvoidingView } from 'native-base';
import KeyboardAvoidingWrapper from '../../components/KeyboardWrapper';
import axios from 'axios';
import { useState } from 'react';
import { z } from 'zod';
import { useNavigation } from '@react-navigation/native';



const emailSchema = z.string().email().max(100);

interface LoginProps {
  navigation: any;
  route: any;
}

const Login = (props: LoginProps) => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const handleLoginPress = async () => {
   
    const validationResult = emailSchema.safeParse(email.trim());
    if (!validationResult.success) {
      setEmailError(validationResult.error.issues[0].message);
      return;
    }

    setEmailError(''); 

    props.navigation.navigate('OTP', { userType: props.route.params.userType,email: email.trim() });
    await axios
      .post('https://smart-tag.onrender.com/login', {
        email: email.trim(),
      })
      .then(function (response) {
        console.log(response.data);
        console.log(response.status);
        const responseData = response.data;
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(() => {
        setEmail('');
      });
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
    setEmailError(''); 
  };

  const handleLinkPress = () =>
    props.navigation.navigate('GetStarted', { userType: props.route.params.userType });

  return (
    <View style={style.container}>
      <KeyboardAvoidingWrapper>
        <SafeAreaView>
          <View>
            <View style={style.imageContainer}>
              <Image source={require('../../../assets/images/login.jpg')} style={style.image} resizeMode='cover' />
              <Text style={style.title}>Login!</Text>
            </View>
          </View>

          <VStack space={2} alignItems="center">
            <FormControl style={style.formControl}>
              <FormControl.Label>
                <Text style={style.labelText}>Email</Text>
              </FormControl.Label>
              <Input
                style={style.input}
                _focus={{ borderColor: 'black' }}
                onChangeText={handleEmailChange}
                value={email}
              />
              {emailError !== '' && <Text style={style.errorText}>{emailError}</Text>}
            </FormControl>
            <Button colorScheme="darkBlue" style={style.button} onPress={handleLoginPress}>
              Submit for OTP
            </Button>
          </VStack>

          <View style={{ padding: 10 }}>
            <Link
              style={style.link}
              isExternal
              _text={{
                color: 'blue.400',
              }}
              onPress={handleLinkPress}
            >
              New User?
            </Link>
          </View>
        </SafeAreaView>
      </KeyboardAvoidingWrapper>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  title: {
    position: 'absolute',
    top: 15,
    left: 0,
    fontSize: 18,
    fontWeight: 'normal',
    fontFamily: 'Poppins',
  },
  imageContainer: {
    marginTop: 0,
    justifyContent: 'center',
    borderRadius: 10,
    margin: 10,
    marginBottom: 0,
    alignItems: 'center',
  },
  image: {
    width: 400,
    height: 450,
    borderRadius: 10,
    alignItems: 'center',
  },
  formControl: {
    borderColor: 'black',
    width: '80%',
  },
  input: {
    height: 40,
    backgroundColor: 'white',
    borderColor: 'black',
    paddingHorizontal: 10,
    fontSize: 16,
  },
  button: {
    width: 300,
    height: 58,
    borderRadius: 8,
  },
  labelText: {
    color: 'black',
    fontFamily: 'Poppins',
  },
  link: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 200,
    fontFamily: 'Poppins',
    paddingBottom: 0,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
  },
});

export default Login;
