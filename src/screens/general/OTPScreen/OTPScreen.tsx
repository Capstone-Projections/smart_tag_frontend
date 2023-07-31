import {
    ActivityIndicator,
    Image,
    Text,
    View,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
} from 'react-native';
import React, { useContext, useState } from 'react';
import { appBlue, whiteColor } from '../../../resources/colors/colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './style';

import KeyboardAvoidingWrapper from '../../../components/general/KeyboardWrapper/KeyboardWrapper';
import { OTPVerificationProps } from './props';
import { AuthContext } from '../../../context/AuthContext';
import { useMessageModal } from '../../../hooks/ModalHook';
import { MessageTypes } from '../../../components/general/modals/types';
import MessageModal from '../../../components/general/modals/MessageModals';
import { Button, Link } from 'native-base';
import axios from 'axios';
import * as Animatable from 'react-native-animatable';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CodeInputField from '../../../components/general/InputField/CodeInputField';

const OTPScreen = (props: OTPVerificationProps) => {
    const {
        userType,
        email,
        setAuthorizationKey,
        authorizationKey,
        getStarted,
    } = useContext(AuthContext);
    const [code, setCode] = useState('');
    const [pinReady, setPinReady] = useState(false);
    const [verifying, setVerifying] = useState(false);

    const { messageModalState, showMessageModal, hideModal, setIsLoading } =
        useMessageModal();

    const handleProceedSuccess = () => {
        hideModal();
        props.navigation.navigate('Drawer');
    };

    const handleProceedFail = () => {
        hideModal();
    };

    const MAX_CODE_LENGTH = 4;

    const handleOTPPress = async () => {
        try {
            setVerifying(true);
            const response = await axios.post(
                'https://smart-tag.onrender.com/authenticate',
                {
                    email: email,
                    emailToken: code,
                }
            );
            setAuthorizationKey(response.headers['authorization']);
            const authorizationKey = response.headers['authorization'];

            // Store the authorization key locally for persistent login
            await AsyncStorage.setItem('authorizationKey', authorizationKey);
            if (response.status !== 200) {
                showMessageModal(
                    MessageTypes.FAIL,
                    'Invalid OTP',
                    'The OTP you entered is invalid',
                    handleProceedFail
                );
            } else {
                if (userType === 'student') {
                    if (getStarted === 'getStarted') {
                        props.navigation.navigate('SetUp');
                    } else {
                        props.navigation.replace('Drawer');
                    }
                } else if (userType === 'lecturer') {
                    if (getStarted === 'getStarted') {
                        props.navigation.navigate('LecturerSetUp');
                    } else {
                        props.navigation.replace('Drawer');
                    }
                }
            } //TODO: remove the any from the type of error and then try and get the correct type for it
        } catch (error: any) {
            console.log(error[0]);
            if (error[0] === 'Network Error') {
                showMessageModal(
                    MessageTypes.FAIL,
                    'Network Error',
                    'An error occurred. Please check your network connection and try again.',
                    handleProceedFail
                );
            } else {
                showMessageModal(
                    MessageTypes.FAIL,
                    'Invalid OTP',
                    'The OTP you entered is invalid',
                    handleProceedFail
                );
            }

            console.log(error);
        } finally {
            setCode('');
            setVerifying(false);
        }
    };

    const handleLinkPress = async () => {
        try {
            setCode('');
            const response = await axios.post(
                'https://smart-tag.onrender.com/login',
                {
                    email: email,
                }
            );

            showMessageModal(
                MessageTypes.INFO,
                'Email Sent',
                'A new OTP code has been sent to your email address',
                handleProceedFail
            );

            console.log(response.status);
        } catch (error) {
            console.log(error);
            if (error) {
                showMessageModal(
                    MessageTypes.FAIL,
                    'Error',
                    'Check your network and try again',
                    handleProceedFail
                );
            }
        } finally {
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <Animatable.View animation="slideInDown" style={styles.header}>
                <Image
                    source={require('../../../../assets/images/Enterotp.png')}
                    style={styles.image}
                    resizeMode="contain"
                />
            </Animatable.View>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <Animatable.View animation="slideInUp" style={styles.footer}>
                    <Text style={styles.text}>Account Verification</Text>
                    <Text style={styles.infoText}>
                        Enter the 4-digit code sent to your email
                    </Text>

                    <CodeInputField
                        setPinReady={setPinReady}
                        code={code}
                        setCode={setCode}
                        maxlength={MAX_CODE_LENGTH}
                    />

                    <Button
                        colorScheme="darkBlue"
                        style={styles.button}
                        onPress={handleOTPPress}
                        disabled={!pinReady}
                    >
                        {verifying ? (
                            <ActivityIndicator size="large" color="white" />
                        ) : (
                            <Text style={{ color: 'white', fontSize: 15 }}>
                                Submit
                            </Text>
                        )}
                    </Button>
                    <View style={styles.textContainer}>
                        <Text>Didn't receive the email?</Text>
                        <Link
                            isExternal
                            _text={{
                                color: 'blue.400',
                            }}
                            onPress={handleLinkPress}
                        >
                            Resend
                        </Link>
                    </View>
                </Animatable.View>
            </ScrollView>
            <MessageModal
                messageModalVisible={messageModalState.messageModalVisible}
                messageType={messageModalState.messageType}
                headerText={messageModalState.headerText}
                messageText={messageModalState.messageText}
                onDismiss={hideModal}
                onProceed={messageModalState.onProceed}
            />
        </SafeAreaView>
    );
};

export default OTPScreen;
