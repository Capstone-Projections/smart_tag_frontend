import React, { useContext, useState } from 'react';
import { View, Text, Image, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FormControl, Input, Button, VStack, Link } from 'native-base';
import KeyboardAvoidingWrapper from '../../../components/general/KeyboardWrapper/KeyboardWrapper';
import axios from 'axios';
import { z } from 'zod';
import { AuthContext } from '../../../context/AuthContext';
import { LoginProps } from './props';
import { style } from './styles';
import MessageModal from '../../../components/general/modals/MessageModals';
import { MessageTypes } from '../../../components/general/modals/types';
import { useMessageModal } from '../../../hooks/ModalHook';

const emailSchema = z.string().email().max(100);

const Login = (props: LoginProps) => {
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

    const handleProceedSuccess = () => {
        // hideModal();
    };

    const handleLoginPress = async () => {
        const validationResult = emailSchema.safeParse(email.trim());
        if (!validationResult.success) {
            setEmailError(validationResult.error.issues[0].message);
            return;
        }

        setEmailError('');

        try {
            setVerifying(true);
            const response = await axios.post(
                'https://smart-tag.onrender.com/login',
                {
                    email: email.trim().toLowerCase(),
                }
            );

            const { data } = response;
            setUserID(data.userid);

            console.log(response.status);

            if (response.status !== 200) {
                showMessageModal(
                    MessageTypes.FAIL,
                    'Network Error',
                    'Check your network and try again',
                    handleProceed
                );
            } else {
                setEmail(email.trim().toLowerCase());
                props.navigation.navigate('OTP');
            }
        } catch (error) {
            console.log(error);
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
        <View style={style.container}>
            <KeyboardAvoidingWrapper>
                <SafeAreaView>
                    <View>
                        <View style={style.imageContainer}>
                            <Image
                                source={require('../../../../assets/images/login.jpg')}
                                style={style.image}
                                resizeMode="cover"
                            />
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
                            {emailError !== '' && (
                                <Text style={style.errorText}>
                                    {emailError}
                                </Text>
                            )}
                        </FormControl>
                        {verifying && (
                            <ActivityIndicator size="large" color={'blue'} />
                        )}
                        {!verifying && (
                            <Button
                                colorScheme="darkBlue"
                                style={style.button}
                                onPress={handleLoginPress}
                            >
                                Submit for OTP
                            </Button>
                        )}
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
                    <MessageModal
                        messageModalVisible={
                            messageModalState.messageModalVisible
                        }
                        messageType={messageModalState.messageType}
                        headerText={messageModalState.headerText}
                        messageText={messageModalState.messageText}
                        onDismiss={hideModal}
                        onProceed={messageModalState.onProceed}
                    />
                </SafeAreaView>
            </KeyboardAvoidingWrapper>
        </View>
    );
};

export default Login;
