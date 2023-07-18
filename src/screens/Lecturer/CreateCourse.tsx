import { StyleSheet, Text, View } from 'react-native';
import React, { useContext, useState } from 'react';
import KeyboardAvoidingWrapper from '../../components/general/KeyboardWrapper/KeyboardWrapper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, FormControl, Input } from 'native-base';
import { appBlue } from '../../resources/colors/colors';
import * as Animatable from 'react-native-animatable';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { z } from 'zod';
import { ActivityIndicator } from 'react-native';
import MessageModal from '../../components/general/modals/MessageModals';
import { MessageTypes } from '../../components/general/modals/types';
import { useMessageModal } from '../../hooks/ModalHook';

const CreateCourse = () => {
    const [course, setCourse] = useState('');
    const [courseCode, setCourseCode] = useState('');
    const { userID, authorizationKey } = useContext(AuthContext);
    const [verifying, setVerifying] = useState(false);

    const { messageModalState, showMessageModal, hideModal, setIsLoading } =
        useMessageModal();

    const handleProceedFail = () => {
        hideModal();
    };

    const handleCancel = () => {
        setCourse('');
        setCourseCode('');
    };

    const handleAddPress = async () => {
        try {
            setVerifying(true);
            const headers = { Authorization: `${authorizationKey}` };
            const response = await axios.post(
                `https://smart-tag.onrender.com/courses/${userID}`,
                {
                    name: course.trim(),
                    courseCode: courseCode.trim().toUpperCase(),
                },
                { headers }
            );

            console.log('Course added successfully:', response.data);
            if (response.status === 200) {
                showMessageModal(
                    MessageTypes.SUCCESS,
                    'Success',
                    'Course added successfully',
                    handleProceedFail
                );
            } else if (response.status !== 200) {
                showMessageModal(
                    MessageTypes.FAIL,
                    'Error',
                    'Failed to add course.Try Again',
                    handleProceedFail
                );
            }

            console.log(response.status);
        } catch (error) {
            console.log(error);
        } finally {
            setVerifying(false);
        }
    };

    return (
        <KeyboardAvoidingWrapper>
            <SafeAreaView
                style={{ flex: 1, backgroundColor: 'white', padding: 5 }}
            >
                <Animatable.View animation="fadeInUp">
                    <View>
                        <Text style={styles.headerText}>Add Course</Text>
                    </View>
                    <View style={styles.line}></View>
                    <View style={styles.container}>
                        <View>
                            <Text style={styles.text}>Course</Text>
                            <FormControl style={styles.formControl}>
                                <Input
                                    style={styles.input}
                                    _focus={{ borderColor: 'black' }}
                                    value={course}
                                    onChangeText={setCourse}
                                />
                            </FormControl>
                        </View>
                        <View>
                            <Text style={styles.text}>Course Code</Text>
                            <FormControl style={styles.formControl}>
                                <Input
                                    style={styles.input}
                                    _focus={{ borderColor: 'black' }}
                                    value={courseCode}
                                    onChangeText={setCourseCode}
                                />
                            </FormControl>
                        </View>
                        <View style={styles.buttonRow}>
                            {verifying && (
                                <ActivityIndicator
                                    size="large"
                                    color={'blue'}
                                />
                            )}
                            {!verifying && (
                                <Button
                                    colorScheme="darkBlue"
                                    style={styles.button}
                                    onPress={handleAddPress}
                                >
                                    <Text
                                        style={{ color: 'white', fontSize: 18 }}
                                    >
                                        Add
                                    </Text>
                                </Button>
                            )}

                            <View style={styles.buttonSpace} />

                            <Button
                                colorScheme="darkBlue"
                                style={styles.buttonOutline}
                                variant="outline"
                                onPress={handleCancel}
                            >
                                <Text style={styles.buttonText}>Cancel</Text>
                            </Button>
                        </View>
                    </View>
                </Animatable.View>
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

const styles = StyleSheet.create({
    container: {
        // alignItems: 'center',
    },
    headerText: {
        fontFamily: 'Poppins',
        fontSize: 20,

        textAlign: 'center',
    },
    line: {
        borderBottomWidth: 1,
        borderBottomColor: 'lightgray',
        marginVertical: 0,
    },
    formControl: {
        borderColor: 'black',
        width: '100%',
    },
    input: {
        height: 50,
        backgroundColor: 'white',
        borderColor: 'black',
        paddingHorizontal: 10,
        fontSize: 16,
    },
    text: {
        fontFamily: 'Poppins',
        fontSize: 16,
    },
    buttonRow: {
        paddingTop: 20,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    button: {
        width: 140,
        height: 50,
        borderRadius: 8,
    },
    buttonOutline: {
        width: 140,
        height: 50,
        borderRadius: 8,
        borderColor: appBlue,
    },
    buttonSpace: {
        width: 15,
    },
    buttonText: {
        color: appBlue,
        fontSize: 18,
    },
});

export default CreateCourse;
