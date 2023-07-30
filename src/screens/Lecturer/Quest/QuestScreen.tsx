import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    FlatList,
    Animated,
    RefreshControl,
    Alert,
} from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './styles';
import { PeopleProps, QuestUsers, User } from '../People/props';
import QuestUserItem from '../../../components/lecturer/PeopleCard';
import { CourseContext } from '../../../context/CourseContext';
import { useQuery, useMutation, QueryCache } from 'react-query';
import axios from 'axios';
import { AuthContext } from '../../../context/AuthContext';
import { LessonContext } from '../../../context/LessonContext';
import MessageModal from '../../../components/general/modals/MessageModals';
import { useMessageModal } from '../../../hooks/ModalHook';
import { MessageTypes } from '../../../components/general/modals/types';
import { Button } from 'native-base';

const QuestScreen = (props: PeopleProps) => {
    const { courseTitle, IDcourse } = React.useContext(CourseContext);
    const { authorizationKey } = React.useContext(AuthContext);
    const { idlesson } = React.useContext(LessonContext);
    const { messageModalState, showMessageModal, hideModal, setIsLoading } =
        useMessageModal();

    const handleProceed = () => {
        hideModal();
    };

    const questFetchStudents = async () => {
        try {
            const headers = { Authorization: `${authorizationKey}` };
            const response = await axios.get(
                `https://smart-tag.onrender.com/attendance/lessons/users/${idlesson}/${IDcourse}`,
                { headers }
            );
            // console.log(response.data[0].attendance[0].idattendance);
            // console.log(response.data);
            return response.data.map((questuser: QuestUsers) => ({
                iduser: questuser.iduser,
                firstName: questuser.firstName,
                lastName: questuser.lastName,
                doubtPoints: questuser.doubtPoints,
                attendance: questuser.attendance,
            }));
        } catch (error) {
            console.log('shit');
            console.log(error);
            // throw new Error('Failed to fetch students for this lesson');
        }
    };

    const { data: users = [] } = useQuery<QuestUsers[]>(
        ['questStudents', IDcourse],
        questFetchStudents,
        { initialData: [] } // Provide initialData option here
    );

    const updateStatus = async (userId: number, doubtPoints: number) => {
        try {
            const headers = { Authorization: `${authorizationKey}` };
            const endpoint = `https://smart-tag.onrender.com/users/doubtPoints/${userId}/${false}`;
            const requestData = { doubtPoints: doubtPoints };
            await axios.put(endpoint, requestData, { headers });
            showMessageModal(
                MessageTypes.SUCCESS,
                'Success!',
                'Query Successful',
                handleProceed
            );
            return console.log('success user doubt point increased');
        } catch (error) {
            if (error) {
                showMessageModal(
                    MessageTypes.FAIL,
                    'Error!',
                    'Query Failed',
                    handleProceed
                );
            }
            throw new Error('Failed to update user status');
        } finally {
        }
    };

    // //add to workflow afer things are done
    const invalidateUserAttendance = async (attendanceid: number) => {
        try {
            const headers = { Authorization: `${authorizationKey}` };
            const endpoint = `https://smart-tag.onrender.com/attendance/${attendanceid}`;
            const invalidateData = { status: false };
            await axios.put(endpoint, invalidateData, { headers });
            return console.log('success user attendance invalidated');
        } catch (error) {
            throw new Error('Failed to invalidate user attendance');
        }
    };

    const renderRightActions = (
        progress: any,
        dragX: any,
        userId: number,
        doubtPoints: number,
        idattendance: number
    ) => {
        const scale = dragX.interpolate({
            inputRange: [-100, 0],
            outputRange: [1, 0],
            extrapolate: 'clamp',
        });
        return (
            <TouchableOpacity
                style={styles.rightAction}
                onPress={() => {
                    // console.log(userId, doubtPoints);
                    updateStatus(userId, doubtPoints);
                    invalidateUserAttendance(idattendance);
                }}
            >
                <Animated.Text
                    style={[styles.actionText, { transform: [{ scale }] }]}
                >
                    Absent
                </Animated.Text>
            </TouchableOpacity>
        );
    };

    const renderLeftActions = (progress: any, dragX: any, userId: number) => {
        const scale = dragX.interpolate({
            inputRange: [0, 100],
            outputRange: [0, 1],
            extrapolate: 'clamp',
        });
        return (
            <TouchableOpacity
                style={styles.leftAction}
                onPress={() => {
                    showMessageModal(
                        MessageTypes.SUCCESS,
                        'Success',
                        'Query Successful',
                        handleProceed
                    );
                }}
            >
                <Animated.Text
                    style={[styles.actionText, { transform: [{ scale }] }]}
                >
                    Present
                </Animated.Text>
            </TouchableOpacity>
        );
    };

    const [showButton, setShowButton] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false);

    const handleFetchUsers = async () => {
        try {
            setIsRefreshing(true);
            const usersData = await questFetchStudents();
            // Check if usersData is not empty
            if (usersData.length > 0) {
                setShowButton(false); // Hide the button if there are users
            } else {
                setShowButton(true);
                Alert.alert('No Users', 'There are no users to display.', [
                    { text: 'OK', onPress: () => console.log('OK Pressed') },
                ]);
            }
            setIsRefreshing(false);
        } catch (error) {
            console.log('Failed to fetch users', error);
            setIsRefreshing(false);
        }
    };

    useEffect(() => {
        handleFetchUsers();
    }, []);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white', padding: 5 }}>
            <View style={styles.container}>
                <View style={styles.headerTextContainer}>
                    <Text style={styles.headerText}>
                        Impersonation Detection
                    </Text>
                </View>

                <View style={styles.line}></View>
                {showButton && (
                    <View
                        style={{
                            paddingTop: 20,
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <Button
                            colorScheme="darkBlue"
                            style={styles.button}
                            onPress={handleFetchUsers}
                        >
                            Find Impersonaters
                        </Button>
                    </View>
                )}
                {users.length > 0 ? (
                    <View>
                        <Text>
                            Swipe left to mark Present, Swipe right to mark
                            Absent
                        </Text>
                        <FlatList
                            showsVerticalScrollIndicator={false}
                            style={{ paddingTop: 2 }}
                            data={users}
                            keyExtractor={(_, index) => index.toString()}
                            renderItem={({ item }) => {
                                return (
                                    <Swipeable
                                        renderRightActions={(progress, dragX) =>
                                            renderRightActions(
                                                progress,
                                                dragX,
                                                item.iduser,
                                                item.doubtPoints,
                                                item.attendance[0].idattendance
                                            )
                                        }
                                        renderLeftActions={(progress, dragX) =>
                                            renderLeftActions(
                                                progress,
                                                dragX,
                                                item.iduser
                                            )
                                        }
                                    >
                                        <QuestUserItem
                                            firstName={item.firstName}
                                            lastName={item.lastName}
                                        />
                                    </Swipeable>
                                );
                            }}
                        />
                    </View>
                ) : null}
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
};

export default QuestScreen;
