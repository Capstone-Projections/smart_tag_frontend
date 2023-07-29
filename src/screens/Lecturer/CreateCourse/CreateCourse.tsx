import { StyleSheet, Text, View } from 'react-native';
import React, { useContext, useState } from 'react';
import KeyboardAvoidingWrapper from '../../../components/general/KeyboardWrapper/KeyboardWrapper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, FormControl, Input } from 'native-base';
import { appBlue } from '../../../resources/colors/colors';
import * as Animatable from 'react-native-animatable';
import axios from 'axios';
import { AuthContext } from '../../../context/AuthContext';
import { z } from 'zod';
import { ActivityIndicator } from 'react-native';
import MessageModal from '../../../components/general/modals/MessageModals';
import { MessageTypes } from '../../../components/general/modals/types';
import { useMessageModal } from '../../../hooks/ModalHook';
import { styles } from './style';

const courseSchema = z.string().min(1).max(100);
const courseCodeSchema = z.string().min(1).max(8);

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
            const courseValidation = courseSchema.safeParse(course);
            const courseCodeValidation = courseCodeSchema.safeParse(courseCode);

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

            showMessageModal(
                MessageTypes.SUCCESS,
                'Success',
                'Course added successfully',
                handleProceedFail
            );

            console.log(response.status);
        } catch (error) {
            console.log(error);
            if (error) {
                showMessageModal(
                    MessageTypes.FAIL,
                    'Error',
                    'Failed to add course.Try Again',
                    handleProceedFail
                );
            }
        } finally {
            setVerifying(false);
            setCourse('');
            setCourseCode('');
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
                            <Text style={styles.instructionText}>
                                Please fill in the following details to add a
                                new course.
                            </Text>
                        </View>
                        <View>
                            <Text style={styles.text}>Course</Text>
                            <FormControl style={styles.formControl}>
                                <Input
                                    style={styles.input}
                                    _focus={{ borderColor: 'black' }}
                                    value={course}
                                    onChangeText={setCourse}
                                    placeholder="Enter course name"
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
                                    placeholder="Enter course code"
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
                    <View style={styles.noteContainer}>
                        <Text style={styles.noteText}>
                            Note: Duplicate courses are not allowed.
                        </Text>
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

export default CreateCourse;
