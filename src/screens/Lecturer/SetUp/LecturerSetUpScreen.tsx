import { View, Text, ActivityIndicator } from 'react-native';
import React, { useContext, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
    FormControl,
    Input,
    VStack,
    Select,
    Box,
    CheckIcon,
    Button,
} from 'native-base';
import KeyboardAvoidingWrapper from '../../../components/general/KeyboardWrapper/KeyboardWrapper';
import { LecturerSetUpScreenProps } from './props';
import { styles } from './styles';
import { AuthContext } from '../../../context/AuthContext';
import MessageModal from '../../../components/general/modals/MessageModals';
import { MessageTypes } from '../../../components/general/modals/types';
import { useMessageModal } from '../../../hooks/ModalHook';
import axios from 'axios';
import { z } from 'zod';

const validationSchema = z.object({
    firstName: z.string().max(100),
    middleName: z.string().max(100),
    lastName: z.string().max(100),
    department: z.string().max(100),

    staffNumber: z.string().refine(value => value.length === 8, {
        message: 'Reference Number must be exactly 8 characters.',
    }),
});

const LecturerSetUpScreen = (props: LecturerSetUpScreenProps) => {
    const {
        userType,
        email,
        userID,
        authorizationKey,
        setLecturerFirstName,
        setLecturerLastName,
    } = useContext(AuthContext);
    const [firstName, setFirstName] = useState('');
    const [middleName, setMiddleName] = useState('');
    const [lastName, setLastName] = useState('');
    const [department, setDepartment] = useState('');
    const [staffNumber, setStaffNUmber] = useState('');
    const [verifying, setVerifying] = useState(false);

    const { messageModalState, showMessageModal, hideModal } =
        useMessageModal();

    const handleProceed = () => {
        hideModal();
    };

    //TODO tie this to the backend
    const handleSetUpPress = async () => {
        try {
            validationSchema.parse({
                firstName,
                middleName,
                lastName,
                department,
                staffNumber,
            });

            if (
                firstName.trim() === '' ||
                middleName.trim() === '' ||
                lastName.trim() === '' ||
                department.trim() === '' ||
                staffNumber.trim() === ''
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
                    department: department,
                    referenceNumber: staffNumber,
                    role: userType.toUpperCase(),
                    isAdmin: true,
                },
                { headers }
            );

            const { data } = response;
            setLecturerFirstName(data.firstName);
            setLecturerLastName(data.lastName);

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
        <View style={styles.container}>
            <KeyboardAvoidingWrapper>
                <SafeAreaView>
                    <View style={{ paddingRight: 50 }}>
                        <Text style={styles.header}>
                            Kindly Setup to get started with Smart Tag
                        </Text>
                    </View>

                    <VStack space={4} mt="5">
                        <View>
                            <Text style={styles.text}>First Name</Text>
                            <FormControl style={styles.formControl}>
                                <Input
                                    style={styles.input}
                                    _focus={{ borderColor: 'black' }}
                                    value={firstName}
                                    onChangeText={setFirstName}
                                />
                            </FormControl>
                        </View>
                        <View>
                            <Text style={styles.text}>Middle Name</Text>
                            <FormControl style={styles.formControl}>
                                <Input
                                    style={styles.input}
                                    _focus={{ borderColor: 'black' }}
                                    value={middleName}
                                    onChangeText={setMiddleName}
                                />
                            </FormControl>
                        </View>
                        <View>
                            <Text style={styles.text}>Last Name</Text>
                            <FormControl style={styles.formControl}>
                                <Input
                                    style={styles.input}
                                    _focus={{ borderColor: 'black' }}
                                    value={lastName}
                                    onChangeText={setLastName}
                                />
                            </FormControl>
                        </View>
                        <View>
                            <Text style={styles.text}>Department</Text>
                            <FormControl style={styles.formControl}>
                                <Input
                                    style={styles.input}
                                    _focus={{ borderColor: 'black' }}
                                    value={department}
                                    onChangeText={setDepartment}
                                />
                            </FormControl>
                        </View>
                        <View>
                            <Text style={styles.text}>Staff Number</Text>
                            <FormControl style={styles.formControl}>
                                <Input
                                    style={styles.input}
                                    _focus={{ borderColor: 'black' }}
                                    keyboardType="numeric"
                                    value={staffNumber}
                                    onChangeText={setStaffNUmber}
                                />
                            </FormControl>
                        </View>

                        {verifying && (
                            <ActivityIndicator size="large" color={'blue'} />
                        )}
                        {!verifying && (
                            <Button
                                colorScheme="darkBlue"
                                style={styles.button}
                                onPress={handleSetUpPress}
                            >
                                Continue
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

export default LecturerSetUpScreen;
