import { View, Text, StyleSheet, Image, ActivityIndicator } from 'react-native';
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
import MessageModal from '../../../components/general/modals/MessageModals';
import { MessageTypes } from '../../../components/general/modals/types';
import { useMessageModal } from '../../../hooks/ModalHook';

const emailSchema = z.string().email().max(100);

const GetStarted = (props: GetStartedProps) => {
    const { setEmail, setUserID } = useContext(AuthContext);
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

    const handleGetStartedPress = async () => {
        const validationResult = emailSchema.safeParse(email.trim());
        if (!validationResult.success) {
            setEmailError(validationResult.error.issues[0].message);
            return;
        }
        setEmailError('');

        try {
            setVerifying(true);
            const response = await axios.post(
                'https://smart-tag.onrender.com/signup',
                {
                    email: email.trim().toLowerCase(),
                }
            );

            const { data } = response;
            setUserID(data.userid);

            console.log(response.status);

            if (response.status === 200) {
                setEmail(email.trim().toLowerCase());
                props.navigation.navigate('OTP'); //
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
        props.navigation.navigate('OTP');
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
                                source={require('../../../../assets/images/started.jpg')}
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
                            {emailError !== '' && (
                                <Text style={style.errorText}>
                                    {emailError}
                                </Text>
                            )}
                        </FormControl>
                        {verifying && (
                            <ActivityIndicator size="small" color={'blue'} />
                        )}
                        {!verifying && (
                            <Button
                                colorScheme="darkBlue"
                                style={style.button}
                                onPress={handleGetStartedPress}
                            >
                                Submit for OTP
                            </Button>
                        )}
                    </VStack>
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

export default GetStarted;
