import { View, Text, StyleSheet, Image } from 'react-native';
import React, { useContext } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FormControl, Input, Button, VStack } from 'native-base';
import KeyboardAvoidingWrapper from '../../../components/general/KeyboardWrapper/KeyboardWrapper';
import axios from 'axios';
import { useState } from 'react';
import { z } from 'zod';
import { AuthContext } from '../../../context/AuthContext';
import { GetStartedProps } from './props';
import { style } from './styles';

const emailSchema = z.string().email().max(100);

const GetStarted = (props: GetStartedProps) => {
    const { setEmail, setUserID } = useContext(AuthContext);
    const [email, setEmailState] = useState('');
    const [emailError, setEmailError] = useState('');

    const handleGetStartedPress = async () => {
        const validationResult = emailSchema.safeParse(email.trim());
        if (!validationResult.success) {
            setEmailError(validationResult.error.issues[0].message);
            return;
        }
        setEmailError('');

        props.navigation.navigate('OTP', {
            email: email.trim().toLowerCase(),
        });
        try {
            const response = await axios.post(
                'https://smart-tag.onrender.com/login',
                {
                    email: email.trim().toLowerCase(),
                }
            );

            const { data } = response;
            setUserID(data.userid);

            console.log(response.status);

            setEmail(email.trim().toLowerCase());
        } catch (error) {
            console.log(error);
        } finally {
            setEmailState('');
        }
    };

    const handleEmailChange = (value: string) => {
        setEmailState(value);
        setEmailError('');
    };

    return (
        <View style={style.container}>
            <KeyboardAvoidingWrapper>
                <SafeAreaView>
                    <View>
                        <View style={style.imageContainer}>
                            <Image
                                source={require('../../../assets/images/started.jpg')}
                                style={style.image}
                                resizeMode="cover"
                            />
                            <Text style={style.title}>Get Started!</Text>
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
                        </FormControl>
                        <Button
                            colorScheme="darkBlue"
                            style={style.button}
                            onPress={handleGetStartedPress}
                        >
                            Submit for OTP
                        </Button>
                    </VStack>
                </SafeAreaView>
            </KeyboardAvoidingWrapper>
        </View>
    );
};

export default GetStarted;
