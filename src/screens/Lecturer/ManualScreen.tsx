import { View, Text, StyleSheet } from 'react-native';
import React, { useContext, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, FormControl, Input } from 'native-base';
import { appBlue } from '../../resources/colors/colors';
import KeyboardAvoidingWrapper from '../../components/general/KeyboardWrapper/KeyboardWrapper';
import { LessonContext } from '../../context/LessonContext';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import {
    LessonContextForLecturers,
    LessonProviderForLecturers,
} from '../../context/LessonContextForLecturers';
import { ActivityIndicator } from 'react-native';
import MessageModal from '../../components/general/modals/MessageModals';
import { MessageTypes } from '../../components/general/modals/types';
import { useMessageModal } from '../../hooks/ModalHook';
// import { LessonContext } from '../../../context/LessonContext';
export interface RouteParams {
    idLessonForLecturers: string;
}

const ManualScreen = () => {
    const [name, setName] = useState('');
    const [indexNumber, setIndexNumber] = useState('');
    // const {idlesson} = useContext(LessonContext);
    // const { idlesson } = useContext(LessonContext);
    const { idLessonForLecturers } = useContext(LessonContextForLecturers);
    const { authorizationKey } = useContext(AuthContext);
    const [verifying, setVerifying] = useState(false);
    // console

    const { messageModalState, showMessageModal, hideModal, setIsLoading } =
        useMessageModal();

    const handleProceed = () => {
        hideModal();
    };

    const handleSubmit = async () => {
        // const { hello } = props.route.initialParams;s
        // console.log("lesson id at manual ", idLessonForLecturers);
        setVerifying(true);
        const payload = {
            indexNumber: indexNumber,
            lesson_idlesson: idLessonForLecturers,
            status: true,
        };
        const headers = { Authorization: authorizationKey };
        const response = await axios
            .post(
                'https://smart-tag.onrender.com/attendance/lecturer',
                payload,
                { headers }
            )
            .catch(error => {
                // alert("couldn't add attendance");
                if (error) {
                    showMessageModal(
                        MessageTypes.FAIL,
                        'Error',
                        'Failed to record attendance',
                        handleProceed
                    );
                } else if (
                    idLessonForLecturers === null ||
                    idLessonForLecturers === undefined
                ) {
                    showMessageModal(
                        MessageTypes.FAIL,
                        'Error',
                        'Please no lesson for today',
                        handleProceed
                    );
                }
            })
            .finally(() => {
                setVerifying(false);
            });
    };

    const handleCancel = () => {
        setName('');
        setIndexNumber('');
    };

    return (
        <KeyboardAvoidingWrapper>
            <SafeAreaView
                style={{ flex: 1, backgroundColor: 'white', padding: 5 }}
            >
                <View>
                    <Text style={styles.headerText}>Add Student</Text>
                </View>
                <View style={styles.line}></View>
                <View style={styles.container}>
                    <View style={{ paddingTop: 10, paddingBottom: 15 }}>
                        <Text style={styles.subText}>
                            Enter the student's details below to record their
                            attendance.
                        </Text>
                    </View>
                    {/* <View>
                        <Text style={styles.text}>Student's Name:</Text>
                        <FormControl style={styles.formControl}>
                            <Input
                                style={styles.input}
                                _focus={{ borderColor: 'black' }}`
                                value={name}
                                onChangeText={setName}
                                placeholder="Enter Name"
                            />
                        </FormControl>
                    </View> */}
                    <View>
                        <Text style={styles.text}>Index Number</Text>
                        <FormControl style={styles.formControl}>
                            <Input
                                style={styles.input}
                                _focus={{ borderColor: 'black' }}
                                keyboardType="numeric"
                                value={indexNumber}
                                onChangeText={setIndexNumber}
                                placeholder="Enter Index Number"
                            />
                        </FormControl>
                    </View>
                    <View style={styles.buttonRow}>
                        {verifying && (
                            <ActivityIndicator size="large" color={'blue'} />
                        )}
                        {!verifying && (
                            <Button
                                colorScheme="darkBlue"
                                style={styles.button}
                                onPress={handleSubmit}
                            >
                                <Text style={{ color: 'white', fontSize: 18 }}>
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
                </View>
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
        fontWeight: '600',
        textAlign: 'center',
    },
    subText: {
        fontFamily: 'Poppins',
        fontSize: 16,
        textAlign: 'center',
        marginVertical: 15,
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
        fontWeight: '400',
    },
    buttonRow: {
        paddingTop: 20,
        flexDirection: 'row',
        alignContent: 'center',
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

export default ManualScreen;
