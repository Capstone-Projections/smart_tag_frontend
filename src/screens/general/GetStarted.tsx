import { View, Text, StyleSheet, Image } from 'react-native';
import React, { useContext } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FormControl, Input, Button, Box, VStack } from 'native-base';
import KeyboardAvoidingWrapper from '../../components/KeyboardWrapper';
import axios from 'axios';
import { useState } from 'react';
import { z } from 'zod';
import { AuthContext } from '../../components/AuthContext';

const emailSchema = z.string().email().max(100);

interface GetStartedProps {
    navigation: any;
    route: any;
}

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
});

export default GetStarted;
