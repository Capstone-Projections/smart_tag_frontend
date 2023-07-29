import React, { useContext, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import NfcManager, { NfcTech } from 'react-native-nfc-manager';
import { TimetableDaysContext } from '../../../context/TimeTableContext';
import { LessonContext } from '../../../context/LessonContext';
import { AuthContext } from '../../../context/AuthContext';
import { LessonRoomContext } from '../../../context/LectureRoomContext';
import getCurrentDay from '../../../services/currentDay';
import axios from 'axios';
import MessageModal from '../../../components/general/modals/MessageModals';
import { MessageTypes } from '../../../components/general/modals/types';
import { useMessageModal } from '../../../hooks/ModalHook';

NfcManager.start();

function NFCScreen() {
    const [tagData, setTagData] = useState('');
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

    async function readNdef() {
        try {
            // register for the NFC tag with NDEF in it
            await NfcManager.requestTechnology(NfcTech.Ndef);
            // the resolved tag object will contain `ndefMessage` property
            const tag = await NfcManager.getTag();

            if (tag) {
                const payload = tag.ndefMessage[0].payload;
                const text = String.fromCharCode.apply(null, payload.slice(3));

                setTagData(text);
                // TODO: make this code more modular after you're done with the testing and it's working
                //TODO: also this is for Blay to add, you have to add the modals that are used to display things to the user
                if (text === lessonRoomId) {
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
                            .catch(error => {
                                // alert("couldn't add attendance");
                                showMessageModal(
                                    MessageTypes.FAIL,
                                    'Attendance',
                                    'Failed to take attendance',
                                    handleProceed
                                );
                            })
                            .finally(() => {
                                // alert('attendance recorded successfully');
                                showMessageModal(
                                    MessageTypes.SUCCESS,
                                    'Attendance',
                                    'Attendance recorded successfully',
                                    handleProceed
                                );
                            });
                    } else {
                        // alert('You have no class today');
                        showMessageModal(
                            MessageTypes.FAIL,
                            'Attendance',
                            'You have no class today',
                            handleProceed
                        );
                    }
                } else {
                    alert('wrong class');
                }
            }
        } catch (ex) {
            console.warn('Oops!', ex);
        } finally {
            // stop the nfc scanning
            NfcManager.cancelTechnologyRequest();
        }
    }

    return (
        <View style={styles.wrapper}>
            <TouchableOpacity onPress={readNdef}>
                <Text>Click to Scan tag for attendance</Text>
            </TouchableOpacity>

            {tagData && (
                <View style={styles.tagContainer}>
                    <Text style={styles.tagText}>Tag found:</Text>
                    <Text style={styles.tagText}>
                        {JSON.stringify(tagData)}
                    </Text>
                </View>
            )}
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

const styles = StyleSheet.create({
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
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
});

export default NFCScreen;
