import {
    View,
    Text,
    ActivityIndicator,
    Image,
    RefreshControl,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from 'native-base';
import { AuthContext } from '../../../context/AuthContext';
import { style } from './styles';
import { ReturnProps, TimetableProps } from './props';
import { CourseContext } from '../../../context/CourseContext';
import axios from 'axios';
import { transformLessonData } from '../../../services/timeTableDisplay';
import { TimetableDaysContext } from '../../../context/TimeTableContext';
import { LessonRoomContext } from '../../../context/LectureRoomContext';
import { getLectureRoomUidByDayAndTime } from '../../../services/getLectureRoomUidByDay';
import { getLessonIdByDayAndTime } from '../../../services/getLessonIdByDay';
import { LessonContext } from '../../../context/LessonContext';
import { useQuery } from 'react-query';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LessonContextForLecturers } from '../../../context/LessonContextForLecturers';
import FloatingButton from '../../../components/general/FloatingButton/FloatingButton';

const Timetable = (props: TimetableProps) => {
    const { authorizationKey, userType } = useContext(AuthContext);
    const { IDcourse, courseTitle } = useContext(CourseContext);
    const { setDays } = useContext(TimetableDaysContext);
    const { setLessonRoomId } = useContext(LessonRoomContext);
    const [isDaysSet, setIsDaysSet] = useState(false);
    const { setIdLesson } = useContext(LessonContext);
    const { setIdLessonForLecturers, idLessonForLecturers } = useContext(
        LessonContextForLecturers
    );
    const [refreshing, setRefreshing] = React.useState(false);

    const fetchLessonsForCourse = async () => {
        try {
            const headers = { Authorization: `${authorizationKey}` };
            const response = await axios.get(
                `https://smart-tag.onrender.com/lessons/course/${IDcourse}`,
                { headers }
            );
            return response.data;
        } catch (error) {
            throw new Error('Failed to fetch timetable for this course');
        }
    };

    const {
        data: lessons = [],
        isLoading: isFetchingLessons,
        isError,
        error,
        refetch,
    } = useQuery<ReturnProps[]>(['lessons', IDcourse], fetchLessonsForCourse);

    const { days, timeRanges } = transformLessonData(lessons);

    useEffect(() => {
        if (lessons.length > 0 && !isDaysSet) {
            const { days } = transformLessonData(lessons);
            setDays(days);
            setIsDaysSet(true);
        }
    }, [lessons, isDaysSet, setDays]);

    useEffect(() => {
        const uid = getLectureRoomUidByDayAndTime(lessons);
        const lessonid = getLessonIdByDayAndTime(lessons);
        // console.log(lessonid)
        if (uid) setLessonRoomId(uid);
        if (lessonid) {
            // idLessonForLecturers
            // console.log(lessonid);

            setIdLesson(lessonid);
            setIdLessonForLecturers(lessonid);
            // console.log("lesson id for lecturer "+idLessonForLecturers)
        }
    }, [lessons, setLessonRoomId]);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        refetch()
            .then(() => {
                setRefreshing(false);
            })
            .catch(() => {
                setRefreshing(false);
            });
    }, []);

    const handlePress = () => {
        props.navigation.navigate('EditLesson');
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white', padding: 5 }}>
            <View>
                <Text style={style.headerText}>{courseTitle}</Text>
            </View>
            <View style={style.container}>
                <ScrollView
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }
                >
                    <View style={style.line}></View>

                    {isFetchingLessons ? (
                        <View>
                            <ActivityIndicator size="large" color="#0000ff" />
                        </View>
                    ) : lessons.length === 0 ? (
                        <View style={style.emptyContainer}>
                            <Image
                                style={style.image}
                                source={require('../../../../assets/images/clock.jpg')}
                            />
                            <Text style={style.emptyText}>
                                No timetable available.
                            </Text>
                        </View>
                    ) : (
                        <View style={style.direction}>
                            <View style={style.dayColumn}>
                                {days.map((day, index) => (
                                    <View key={index} style={style.card}>
                                        <Text style={style.dayText}>{day}</Text>
                                    </View>
                                ))}
                            </View>
                            <View style={style.timeColumn}>
                                {timeRanges.map((times, index) => (
                                    <View key={index} style={style.card}>
                                        <Text style={style.timeText}>
                                            {times}
                                        </Text>
                                    </View>
                                ))}
                            </View>
                        </View>
                    )}
                </ScrollView>

                {userType === 'lecturer' && ( // Show the following component only for lecturers
                    <FloatingButton navigation={props.navigation} />
                )}
            </View>
        </SafeAreaView>
    );
};

export default Timetable;
