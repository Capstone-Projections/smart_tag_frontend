import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
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
import { style } from '../../general/Timetable/styles';
import { SafeAreaView } from 'react-native-safe-area-context';

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
            const tag = await NfcManager.getTag().then();

            if (tag) {
                const payload = tag.ndefMessage[0].payload;
                const text = String.fromCharCode.apply(null, payload.slice(3));

                setTagData(text);
                // TODO: make this code more modular after you're done with the testing and it's working
                if (text === lessonRoomId) {
                    if (days.includes(today)) {
                        const payload = {
                            status: true,
                            lesson_idlesson: idlesson,
                            user_iduser: userID,
                        };
                        const headers = { Authorization: authorizationKey };
                        const response: any = await axios
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
                                    'Could not add attendance',
                                    handleProceed
                                );
                            })
                            .finally(() => {
                                // alert('attendance recorded successfully');
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
                            });
                    } else {
                        showMessageModal(
                            MessageTypes.FAIL,
                            'Attendance',
                            'You have no class today',
                            handleProceed
                        );
                    }
                } else if (text !== lessonRoomId) {
                    showMessageModal(
                        MessageTypes.FAIL,
                        'Attendance',
                        'Wrong class',
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
            }
        } catch (ex) {
            showMessageModal(
                MessageTypes.FAIL,
                'Attendance',
                'Did not find tag',
                handleProceed
            );
        } finally {
            NfcManager.cancelTechnologyRequest();
        }
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white', padding: 5 }}>
            <View>
                <Text style={styles.tagText}>Tap to Scan Tag</Text>
            </View>
            <View style={style.line}></View>
            <View
                style={{
                    width: '100%',
                    height: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <TouchableOpacity
                    onPress={readNdef}
                    disabled={false}
                    activeOpacity={0.5} // This sets the opacity of the TouchableOpacity when pressed
                >
                    <Image
                        source={require('../../../../assets/images/NFClogo.png')}
                        resizeMode="cover"
                        height={200}
                        width={400}
                        // style={{backgroundColor: 'red'}}
                    />
                </TouchableOpacity>
            </View>
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

export const styles = StyleSheet.create({
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
});

export default NFCScreen;
