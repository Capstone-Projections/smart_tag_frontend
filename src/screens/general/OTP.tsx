import React, { useContext, useState } from 'react';
import {
    BottomHalf,
    IconBg,
    OTPInputContainer,
    StyledContainer,
    TextInputHidden,
    TopHalf,
} from './style';
import { View, StyleSheet, Text, Image, ActivityIndicator } from 'react-native';
import { StatusBar } from 'native-base';
import { Octicons } from '@expo/vector-icons';
import CodeInputField from '../../components/general/InputField/CodeInputField';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { AuthContext } from '../../components/AuthContext';
import { ToastAlert } from '../../components/general/AppToast/AppToast';
import { ToastDetails } from '../../components/general/AppToast/toastDetails';

interface OTPVerificationProps {
    navigation: any;
    route: any;
}

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
    const [showInvalidOTP, setShowInvalidOTP] = useState(false); // State variable for controlling toast display

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
                        props.navigation.navigate('LecturerDrawer');
                    }
                }
            }
        } catch (error) {
            setShowInvalidOTP(true); // Show toast for invalid OTP
            console.log(error);
        } finally {
            setVerifying(false);
        }
    };

    return (
        <StyledContainer>
            <StatusBar hidden />
            <TopHalf>
                <Image
                    source={require('../../../assets/images/otpImage.jpg')}
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

                {verifying && <ActivityIndicator color={'blue'} />}

                {/* Invalid OTP toast */}
                {showInvalidOTP && (
                    <ToastAlert
                        id="invalidOTP"
                        variant={ToastDetails.invalidOTP.variant}
                        title={ToastDetails.invalidOTP.title}
                        description={ToastDetails.invalidOTP.description}
                        isClosable={true}
                        onClose={() => setShowInvalidOTP(false)}
                    />
                )}
            </BottomHalf>
        </StyledContainer>
    );
};

const style = StyleSheet.create({
    image: {
        width: 414,
        height: 300,
        borderRadius: 10,
        alignItems: 'center',
        margin: 0,
    },
    text: {
        fontSize: 25,
        textAlign: 'center',
        fontWeight: 'bold',
        fontFamily: 'Poppins',
        padding: 10,
    },
    infoText: {
        fontSize: 15,
        textAlign: 'center',
        fontFamily: 'Poppins',
    },
    button: {
        marginTop: 20,
        marginLeft: 20,
        width: 250,
        height: 58,
        borderRadius: 8,
    },
});

export default OTPVerificationScreen;
