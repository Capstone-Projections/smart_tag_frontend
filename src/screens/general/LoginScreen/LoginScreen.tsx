import {
    ActivityIndicator,
    Dimensions,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import React, { useContext, useState } from 'react';
import { appBlue, whiteColor } from '../../../resources/colors/colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { Button, FormControl, Input, Link, VStack } from 'native-base';
import axios from 'axios';
import { z } from 'zod';
import { AuthContext } from '../../../context/AuthContext';
import MessageModal from '../../../components/general/modals/MessageModals';
import { MessageTypes } from '../../../components/general/modals/types';
import { useMessageModal } from '../../../hooks/ModalHook';
import { LoginProps } from './props';
import { styles } from './styles';

const emailSchema2 = z.string().email().max(100);

const LoginScreen = (props: LoginProps) => {
    const { setEmail, setUserID, userType, setGetStarted } =
        useContext(AuthContext);
    const [email, setEmailState] = useState('');
    const [emailError, setEmailError] = useState('');
    const [verifying, setVerifying] = useState(false);

    const { messageModalState, showMessageModal, hideModal, setIsLoading } =
        useMessageModal();

    const handleProceed = () => {
        hideModal();
    };

    const handleLoginPress = async () => {
        const timeoutDuration = 10000;

        const validationResult = emailSchema2.safeParse(email.trim());
        if (!validationResult.success) {
            setEmailError(validationResult.error.issues[0].message);
            return;
        }

        setEmailError('');

        try {
            setVerifying(true);

            const timeoutPromise = new Promise(resolve => {
                setTimeout(() => {
                    resolve({ status: 408 }); // Return a custom status code (408: Request Timeout)
                }, timeoutDuration);
            });

            const response = await axios.post(
                'https://smart-tag.onrender.com/login',
                {
                    email: email.trim().toLowerCase(),
                }
            );

            const { data } = response;
            setUserID(data.userid);

            console.log(response.status);

            if (response.status === 200) {
                setEmail(email.trim().toLowerCase());
                props.navigation.navigate('OTPScreen'); //
            } else {
            }
        } catch (error) {
            console.log(error);
            if (error) {
                showMessageModal(
                    MessageTypes.FAIL,
                    'Error',
                    'Check your network and try again',
                    handleProceed
                );
            }
        } finally {
            setEmailState('');
            setVerifying(false);
        }
    };

    const handleEmailChange = (value: string) => {
        setEmailState(value);
        setEmailError('');
    };

    const handleLinkPress = () => {
        setGetStarted('getStarted');
        props.navigation.navigate('GetStarted');
    };

    return (
        <SafeAreaView style={styles.container}>
            <Animatable.View animation="fadeInDown" style={styles.header}>
                <Image
                    source={require('../../../../assets/images/start_icon.png')}
                    resizeMode="cover"
                    style={styles.image}
                />
            </Animatable.View>
            <Animatable.View animation="fadeInUp" style={styles.footer}>
                <Text style={styles.text}>Get Started!</Text>
                <Text style={styles.subText}>Login with your email</Text>
                <VStack space={5} alignItems="center">
                    <FormControl style={styles.formControl}>
                        <FormControl.Label></FormControl.Label>
                        <Input
                            style={styles.input}
                            _focus={{ borderColor: 'black' }}
                            placeholder="Email"
                            onChangeText={handleEmailChange}
                            value={email}
                        />
                        {emailError !== '' && (
                            <Text style={styles.errorText}>{emailError}</Text>
                        )}
                    </FormControl>

                    {verifying && (
                        <ActivityIndicator size="large" color={'blue'} />
                    )}
                    {!verifying && (
                        <Button
                            colorScheme="darkBlue"
                            style={styles.button}
                            onPress={handleLoginPress}
                        >
                            Submit For OTP
                        </Button>
                    )}
                </VStack>
                <View style={{ paddingTop: 15 }}>
                    <Link
                        style={styles.link}
                        isExternal
                        _text={{
                            color: 'blue.400',
                        }}
                        onPress={handleLinkPress}
                    >
                        New User?
                    </Link>
                </View>
                <MessageModal
                    messageModalVisible={messageModalState.messageModalVisible}
                    messageType={messageModalState.messageType}
                    headerText={messageModalState.headerText}
                    messageText={messageModalState.messageText}
                    onDismiss={hideModal}
                    onProceed={messageModalState.onProceed}
                />
            </Animatable.View>
        </SafeAreaView>
    );
};
const { height } = Dimensions.get('screen');
const height_logo = height * 0.28;

export default LoginScreen;
