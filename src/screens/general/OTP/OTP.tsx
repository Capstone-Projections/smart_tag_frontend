import React, { useContext, useState } from 'react';
import { BottomHalf, StyledContainer, TopHalf, style } from './styles';
import { StyleSheet, Text, Image, ActivityIndicator, View } from 'react-native';
import CodeInputField from '../../../components/general/InputField/CodeInputField';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Link } from 'native-base';
import axios from 'axios';
import { AuthContext } from '../../../context/AuthContext';
import KeyboardAvoidingWrapper from '../../../components/general/KeyboardWrapper/KeyboardWrapper';
import { OTPVerificationProps } from './props';
import MessageModal from '../../../components/general/modals/MessageModals';
import { MessageTypes } from '../../../components/general/modals/types';
import { useMessageModal } from '../../../hooks/ModalHook';

const OTPVerificationScreen = (props: OTPVerificationProps) => {
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
                        props.navigation.navigate('Drawer');
                    }
                } else if (userType === 'lecturer') {
                    if (getStarted === 'getStarted') {
                        props.navigation.navigate('LecturerSetUp');
                    } else {
                        props.navigation.navigate('Drawer');
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
            setVerifying(false);
        }
    };

    const handleLinkPress = async () => {
        try {
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
        } finally {
        }
    };

    return (
        <KeyboardAvoidingWrapper>
            <SafeAreaView>
                <StyledContainer style={{ alignItems: 'center' }}>
                    <TopHalf>
                        <Image
                            source={require('../../../../assets/images/otpImage.jpg')}
                            style={style.image}
                        />
                    </TopHalf>
                    <BottomHalf>
                        <Text style={style.text}>Account Verification</Text>
                        <Text style={style.infoText}>
                            Enter the 4-digit code sent to your email
                        </Text>

                        <CodeInputField
                            setPinReady={setPinReady}
                            code={code}
                            setCode={setCode}
                            maxlength={MAX_CODE_LENGTH}
                        />

                        {!verifying && pinReady && (
                            <Button
                                colorScheme="darkBlue"
                                style={style.button}
                                onPress={handleOTPPress}
                            >
                                Submit
                            </Button>
                        )}

                        {!verifying && !pinReady && (
                            <Button size="sm" isDisabled style={style.button}>
                                Submit
                            </Button>
                        )}

                        {verifying && (
                            <ActivityIndicator size="large" color={'blue'} />
                        )}
                        <View style={style.textContainer}>
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
                    </BottomHalf>
                </StyledContainer>
                <MessageModal
                    messageModalVisible={messageModalState.messageModalVisible}
                    messageType={messageModalState.messageType}
                    headerText={messageModalState.headerText}
                    messageText={messageModalState.messageText}
                    onDismiss={hideModal}
                    onProceed={messageModalState.onProceed}
                />
            </SafeAreaView>
        </KeyboardAvoidingWrapper>
    );
};

export default OTPVerificationScreen;
