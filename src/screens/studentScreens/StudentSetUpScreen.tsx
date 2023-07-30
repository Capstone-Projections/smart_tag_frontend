import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import React, { useContext, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FormControl, Input, VStack, Button } from 'native-base';
import KeyboardAvoidingWrapper from '../../components/general/KeyboardWrapper/KeyboardWrapper';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { z } from 'zod';
import MessageModal from '../../components/general/modals/MessageModals';
import { MessageTypes } from '../../components/general/modals/types';
import { useMessageModal } from '../../hooks/ModalHook';

interface StudentSetUpScreenProps {
    navigation: any;
    route: any;
}

const validationSchema = z.object({
    firstName: z.string().max(100),
    middleName: z.string().max(100),
    lastName: z.string().max(100),
    indexNumber: z.string().refine(value => value.length === 7, {
        message: 'Index Number must be exactly 7 characters.',
    }),
    referenceNumber: z.string().refine(value => value.length === 8, {
        message: 'Reference Number must be exactly 8 characters.',
    }),
});

const StudentSetUpScreen = (props: StudentSetUpScreenProps) => {
    const {
        userType,
        email,
        userID,
        authorizationKey,
        setFirstNameData,
        setLastNameData,
    } = useContext(AuthContext);
    const [firstName, setFirstName] = useState('');
    const [middleName, setMiddleName] = useState('');
    const [lastName, setLastName] = useState('');
    const [indexNumber, setIndexNUmber] = useState('');
    const [referenceNumber, setReferenceNUmber] = useState('');
    const [verifying, setVerifying] = useState(false);

    const { messageModalState, showMessageModal, hideModal } =
        useMessageModal();

    const handleProceed = () => {
        hideModal();
    };

    const handleSetUpPress = async () => {
        try {
            validationSchema.parse({
                firstName,
                middleName,
                lastName,
                indexNumber,
                referenceNumber,
            });

            if (
                firstName.trim() === '' ||
                middleName.trim() === '' ||
                lastName.trim() === '' ||
                indexNumber.trim() === '' ||
                referenceNumber.trim() === ''
            ) {
                showMessageModal(
                    MessageTypes.FAIL,
                    'Error',
                    'Please fill in all fields correctly.',
                    handleProceed
                );
            }
            setVerifying(true);
            const headers = { Authorization: `${authorizationKey}` };

            const response = await axios.put(
                `https://smart-tag.onrender.com/users/${userID}`,
                {
                    email: email,
                    firstName: firstName,
                    middleName: middleName,
                    lastName: lastName,
                    indexNumber: indexNumber,
                    referenceNumber: referenceNumber,
                    role: userType.toUpperCase(),
                },
                { headers }
            );

            const { data } = response;
            setFirstNameData(data.firstName);
            setLastNameData(data.lastName);

            props.navigation.navigate('Drawer');
        } catch (error: any) {
            showMessageModal(
                MessageTypes.FAIL,
                'Error',
                'Please fill in all fields correctly',
                handleProceed
            );
            // console.error(error);
        } finally {
            setVerifying(false);
        }
    };

    return (
        <KeyboardAvoidingWrapper>
            <SafeAreaView style={style.container}>
                <View>
                    <Text style={style.header}>
                        Kindly Setup to get started with Smart Tag
                    </Text>
                </View>

                <VStack space={4} mt="5">
                    <View>
                        <Text style={style.text}>First Name</Text>
                        <FormControl style={style.formControl}>
                            <Input
                                style={style.input}
                                _focus={{ borderColor: 'black' }}
                                value={firstName}
                                onChangeText={setFirstName}
                            />
                        </FormControl>
                    </View>
                    <View>
                        <Text style={style.text}>Middle Name</Text>
                        <FormControl style={style.formControl}>
                            <Input
                                style={style.input}
                                _focus={{ borderColor: 'black' }}
                                value={middleName}
                                onChangeText={setMiddleName}
                            />
                        </FormControl>
                    </View>
                    <View>
                        <Text style={style.text}>Last Name</Text>
                        <FormControl style={style.formControl}>
                            <Input
                                style={style.input}
                                _focus={{ borderColor: 'black' }}
                                value={lastName}
                                onChangeText={setLastName}
                            />
                        </FormControl>
                    </View>
                    <View>
                        <Text style={style.text}>Index Number</Text>
                        <FormControl style={style.formControl}>
                            <Input
                                style={style.input}
                                _focus={{ borderColor: 'black' }}
                                keyboardType="numeric"
                                value={indexNumber}
                                onChangeText={setIndexNUmber}
                            />
                        </FormControl>
                    </View>
                    <View>
                        <Text style={style.text}>Reference Number</Text>
                        <FormControl style={style.formControl}>
                            <Input
                                style={style.input}
                                _focus={{ borderColor: 'black' }}
                                keyboardType="numeric"
                                value={referenceNumber}
                                onChangeText={setReferenceNUmber}
                            />
                        </FormControl>
                    </View>
                    <Button
                        colorScheme="darkBlue"
                        style={style.button}
                        onPress={handleSetUpPress}
                    >
                        {verifying ? (
                            <ActivityIndicator size="large" color="white" />
                        ) : (
                            <Text style={{ color: 'white', fontSize: 15 }}>
                                Continue
                            </Text>
                        )}
                    </Button>
                </VStack>
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

const style = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        alignItems: 'center',
        paddingTop: 60,
        justifyContent: 'center',
    },
    formControl: {
        borderColor: 'black',
        width: 300,
    },
    input: {
        height: 40,
        backgroundColor: 'white',
        borderColor: 'black',
        paddingHorizontal: 10,
        fontSize: 16,
    },
    header: {
        fontFamily: 'Poppins-Bold',
        fontSize: 20,
        textAlign: 'center',
    },
    text: {
        fontFamily: 'Poppins',
        fontSize: 14,
        fontWeight: '400',
    },
    button: {
        width: 300,
        height: 58,
        borderRadius: 8,
        fontWeight: '',
    },
});

export default StudentSetUpScreen;
