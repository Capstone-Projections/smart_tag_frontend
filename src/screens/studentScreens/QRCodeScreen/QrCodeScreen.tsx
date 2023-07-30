import { View, Text, StyleSheet } from 'react-native';
import { styles } from './styles';
import BarcodeScanner from '../../../components/Student/BarCodeScanner/BarCodeScanner';
import { LessonContext } from '../../../context/LessonContext';
import { TimetableDaysContext } from '../../../context/TimeTableContext';
import React, { useContext } from 'react';
import getCurrentDay from '../../../services/currentDay';
import { AuthContext } from '../../../context/AuthContext';
import { LessonRoomContext } from '../../../context/LectureRoomContext';
import axios from 'axios';
import MessageModal from '../../../components/general/modals/MessageModals';
import { MessageTypes } from '../../../components/general/modals/types';
import { useMessageModal } from '../../../hooks/ModalHook';
import { SafeAreaView } from 'react-native-safe-area-context';

export function QRCodeScreen() {
    const { days } = useContext(TimetableDaysContext);
    const { idlesson } = useContext(LessonContext);
    const { userID, authorizationKey } = useContext(AuthContext);
    const { lessonRoomId } = useContext(LessonRoomContext);
    const today = getCurrentDay();
    const { messageModalState, showMessageModal, hideModal, setIsLoading } =
        useMessageModal();

    const handleProceed = () => {
        hideModal();
    };

    const handleQRCodeScanned = async (data: string) => {
        if (data.trim() === lessonRoomId) {
            if (days.includes(today)) {
                const payload = {
                    status: true,
                    lesson_idlesson: idlesson,
                    user_iduser: userID,
                };
                const headers = { Authorization: authorizationKey };
                const response = await axios
                    .post(
                        'https://smart-tag.onrender.com/attendance',
                        payload,
                        { headers }
                    )
                    .then(response => {
                        // showMessageModal(
                        //     MessageTypes.SUCCESS,
                        //     'Attendance',
                        //     `Attendance taken for ${response.data.user.firstName}`,
                        //     handleProceed
                        // );
                        if (
                            response.data.message ===
                            'Attendance already taken for class'
                        ) {
                            showMessageModal(
                                MessageTypes.INFO,
                                'Attendance',
                                'Attendance was already recorded',
                                handleProceed
                            );
                        } else {
                            showMessageModal(
                                MessageTypes.SUCCESS,
                                'Attendance',
                                `Attendance recorded for ${response.data.user.firstName}`,
                                handleProceed
                            );
                        }
                    })
                    .catch(error => {
                        // console.error('Failed to take attendance:', error);
                        // Alert error message

                        showMessageModal(
                            MessageTypes.FAIL,
                            'Attendance',
                            'Failed to take attendance',
                            handleProceed
                        );
                    });
            } else {
                showMessageModal(
                    MessageTypes.FAIL,
                    'Attendance',
                    'You have no class at this time',
                    handleProceed
                );
            }
        } else if (data.trim() !== lessonRoomId) {
            showMessageModal(
                MessageTypes.FAIL,
                'Attendance',
                'Wrong Class',
                handleProceed
            );
        } else if (!lessonRoomId) {
            showMessageModal(
                MessageTypes.FAIL,
                'Attendance',
                'No class',
                handleProceed
            );
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white', padding: 5 }}>
            <View>
                <Text style={stylesCopy.tagText}>Scan QRCode</Text>
            </View>
            <View style={stylesCopy.line}></View>

            <BarcodeScanner
                boxSize={200}
                onQRCodeScanned={handleQRCodeScanned}
            />

            <MessageModal
                messageModalVisible={messageModalState.messageModalVisible}
                messageType={messageModalState.messageType}
                headerText={messageModalState.headerText}
                messageText={messageModalState.messageText}
                onDismiss={hideModal}
                onProceed={messageModalState.onProceed}
            />
        </SafeAreaView>
    );
}

export const stylesCopy = StyleSheet.create({
    wrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    tagContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    tagText: {
        textAlign: 'center',
        fontFamily: 'Poppins',
        fontWeight: '400',
        fontSize: 20,
    },
    imageWrapperWrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerText: {
        textAlign: 'center',
        fontFamily: 'Poppins',
        fontWeight: '600',
        fontSize: 20,
    },
    line: {
        borderBottomWidth: 1,
        borderBottomColor: 'lightgray',
        marginVertical: 5,
    },
});
