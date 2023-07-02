import React, { useContext, useState } from 'react';
import { BottomHalf, StyledContainer, TopHalf, style } from './styles';
import { StyleSheet, Text, Image, ActivityIndicator, View } from 'react-native';
import CodeInputField from '../../../components/general/InputField/CodeInputField';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Link } from 'native-base';
import axios from 'axios';
import { AuthContext } from '../../../context/AuthContext';
import KeyboardAvoidingWrapper from '../../../components/general/KeyboardWrapper/KeyboardWrapper';
import { CustomAlert } from '../../../components/general/Alert/Alert';
import { OTPVerificationProps } from './props';

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
    const [showInvalidOTP, setShowInvalidOTP] = useState(false);
    const [showAlert, setShowAlert] = useState(false); // New state for showing/hiding the alert
    const [alertData, setAlertData] = useState({
        status: '',
        title: '',
    });

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
                setShowInvalidOTP(true); // Show toast for invalid OTP
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
                setAlertData({
                    status: 'error',
                    title: 'Network Error',
                });
                setShowAlert(true);
            } else {
                setAlertData({
                    status: 'error',
                    title: 'The OTP you entered is invalid',
                });
                setShowAlert(true);
            }

            console.log(error);
        } finally {
            setVerifying(false);
        }
    };

    const handleCloseAlert = () => {
        setShowAlert(false);
    };

    const handleLinkPress = async () => {
        try {
            const response = await axios.post(
                'https://smart-tag.onrender.com/login',
                {
                    email: email,
                }
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
                        {showAlert && (
                            <CustomAlert
                                alert={alertData}
                                onClose={handleCloseAlert}
                            />
                        )}
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
            </SafeAreaView>
        </KeyboardAvoidingWrapper>
    );
};

export default OTPVerificationScreen;
