import { View, Text } from 'react-native';
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
                        showMessageModal(
                            MessageTypes.SUCCESS,
                            'Attendance',
                            `Attendance taken for ${response.data.user.firstName}`,
                            handleProceed
                        );
                    })
                    .catch(error => {
                        console.error('Failed to take attendance:', error);
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
        } else {
            showMessageModal(
                MessageTypes.FAIL,
                'Attendance',
                "You're at the wrong class",
                handleProceed
            );
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Scan QR Code</Text>
            <BarcodeScanner
                boxSize={200}
                boxPosition={{
                    top: '20%',
                    left: '-32%',
                    transform: [{ translateX: -50 }, { translateY: -50 }],
                }}
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
        </View>
    );
}
