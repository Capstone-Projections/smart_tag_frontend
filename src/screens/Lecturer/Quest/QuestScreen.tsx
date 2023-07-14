import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    FlatList,
    Animated,
} from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './styles';
import { PeopleProps, QuestUsers, User } from '../People/props';
import UserItem from '../../../components/lecturer/PeopleCard';
import { CourseContext } from '../../../context/CourseContext';
import { useQuery, useMutation, QueryCache } from 'react-query';
import axios from 'axios';
import { AuthContext } from '../../../context/AuthContext';
import { LessonContext } from '../../../context/LessonContext';
import MessageModal from '../../../components/general/modals/MessageModals';
import { useMessageModal } from '../../../hooks/ModalHook';
import { MessageTypes } from '../../../components/general/modals/types';

const QuestScreen = (props: PeopleProps) => {
    const { courseTitle, IDcourse } = React.useContext(CourseContext);
    const { authorizationKey } = React.useContext(AuthContext);
    const { idlesson } = React.useContext(LessonContext);
    const { messageModalState, showMessageModal, hideModal, setIsLoading } =
        useMessageModal();

    const handleProceed = () => {
        hideModal();
    };

    const fetchStudents = async () => {
        try {
            const headers = { Authorization: `${authorizationKey}` };
            const response = await axios.get(
                `https://smart-tag.onrender.com/attendance/lessons/users/${idlesson}`,
                { headers }
            );
            console.log(response.data);
            return response.data.map((questuser: QuestUsers) => ({
                iduser: questuser.iduser,
                firstName: questuser.firstName,
                lastName: questuser.lastName,
                doubtPoints: questuser.doubtPoints,
            }));
        } catch (error) {
            console.log('shit');
            throw new Error('Failed to fetch students for this lesson');
        }
    };

    const { data: users = [] } = useQuery<QuestUsers[]>(
        ['students', IDcourse],
        fetchStudents
    );

    // const updateStatus = async (userId: number, doubtPoints: number) => {
    //     try {
    //         const headers = { Authorization: `${authorizationKey}` };
    //         const endpoint = `https://smart-tag.onrender.com/users/doubtPoints/${userId}/${false}`;
    //         const requestData = { doubtPoints: doubtPoints };
    //         await axios.put(endpoint, requestData, { headers });
    //     } catch (error) {
    //         throw new Error('Failed to update user status');
    //     } //TODO: Add a finally tag over here
    // };

    // //add to workflow afer things are done
    // const invalidateUserAttendance = async (attendanceid: number) => {
    //     try {
    //         const headers = { Authorization: `${authorizationKey}` };
    //         const endpoint = `https://smart-tag.onrender.com/attendance/${attendanceid}`;
    //         const invalidateData = { status: false };
    //         await axios.put(endpoint, { headers });
    //     } catch (error) {
    //         throw new Error('Failed to invalidate user attendance');
    //     }
    // };

    const renderRightActions = (
        progress: any,
        dragX: any,
        userId: number,
        doubtPoints: number
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
                    // updateStatus(userId, doubtPoints);
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
            <TouchableOpacity style={styles.leftAction} onPress={() => {}}>
                <Animated.Text
                    style={[styles.actionText, { transform: [{ scale }] }]}
                >
                    Present
                </Animated.Text>
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white', padding: 5 }}>
            <View style={styles.container}>
                <View style={styles.headerTextContainer}>
                    <Text style={styles.headerText}>{courseTitle} </Text>
                </View>
                <View style={styles.subTextContainer}>
                    <Text style={styles.subText}>Students:</Text>
                </View>
                <View style={styles.line}></View>
                {users.length > 0 ? (
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        style={{ paddingTop: 2 }}
                        data={users}
                        keyExtractor={(_, index) => index.toString()}
                        renderItem={({ item }) => {
                            // console.log(item);
                            return (
                                <Swipeable
                                    renderRightActions={(progress, dragX) =>
                                        renderRightActions(
                                            progress,
                                            dragX,
                                            item.iduser,
                                            item.doubtPoints
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
                                    <UserItem
                                        firstName={item.firstName}
                                        lastName={item.lastName}
                                    />
                                </Swipeable>
                            );
                        }}
                    />
                ) : (
                    <View style={styles.emptyContainer}>
                        <Image
                            style={styles.image}
                            source={require('../../../../assets/images/people.jpg')}
                        />
                        <Text style={styles.emptyText}>
                            No students' attendance recorded yet.
                        </Text>
                    </View>
                )}
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
