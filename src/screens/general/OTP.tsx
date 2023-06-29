import React, { useContext } from 'react';
import { useState } from 'react';
import {
    BottomHalf,
    IconBg,
    OTPInputContainer,
    StyledContainer,
    TextInputHidden,
    TopHalf,
} from './style';
import {
    View,
    StyleSheet,
    Text,
    Image,
    ActivityIndicator,
    Alert,
} from 'react-native';
import KeyboardAvoidingWrapper from './../../components/KeyboardWrapper';
import { StatusBar } from 'native-base';
import { Octicons } from '@expo/vector-icons';
import CodeInputField from '../../components/general/InputField/CodeInputField';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { CustomAlert } from '../../components/general/Alert';
import { AuthContext } from '../../components/AuthContext';

interface OTPVerificatioProps {
    navigation: any;
    route: any;
}

const OTPVerificationScreen = (props: OTPVerificatioProps) => {
    const { userType, email, setAuthorizationKey } = useContext(AuthContext);
    const [code, setCode] = useState('');
    const [pinReady, setPinReady] = useState(false);
    const [verifying, setVerifying] = useState(false);
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
            console.log(response.headers['authorization']);
            setAuthorizationKey(response.headers['authorization']);
            if (response.status !== 200) {
                setAlertData({
                    status: 'error',
                    title: 'The OTP you entered is invalid',
                });
                setShowAlert(true);
            } else {
                if (userType === 'student') {
                    props.navigation.navigate('SetUp');
                } else if (userType === 'lecturer') {
                    props.navigation.navigate('LecturerSetUp');
                }
            }
        } catch (error) {
            setAlertData({
                status: 'error',
                title: 'The OTP you entered is invalid',
            });
            setShowAlert(true);
            console.log(error);
        } finally {
            setVerifying(false);
        }
    };

    const handleCloseAlert = () => {
        setShowAlert(false);
    };

    return (
        <KeyboardAvoidingWrapper>
            <SafeAreaView>
                <StyledContainer style={{ alignItems: 'center' }}>
                    <TopHalf>
                        <Image
                            source={require('../../../assets/images/otpImage.jpg')}
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

                        {verifying && <ActivityIndicator color={'blue'} />}
                    </BottomHalf>
                </StyledContainer>
            </SafeAreaView>
        </KeyboardAvoidingWrapper>
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
