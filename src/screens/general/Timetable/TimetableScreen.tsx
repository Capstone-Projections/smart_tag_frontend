import { View, Text, ActivityIndicator } from 'react-native';
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
import { Image } from 'react-native';

const Timetable = (props: TimetableProps) => {
    const { authorizationKey } = useContext(AuthContext);
    const { IDcourse, courseTitle } = useContext(CourseContext);
    const { setDays } = useContext(TimetableDaysContext);
    const { setLessonRoomId } = useContext(LessonRoomContext);
    const [isDaysSet, setIsDaysSet] = useState(false);
    const { setIdLesson } = useContext(LessonContext);

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
        if (uid) setLessonRoomId(uid);
        if (lessonid) setIdLesson(lessonid);
    }, [lessons, setLessonRoomId]);

    const handleLinkPress = () => props.navigation.navigate('View');

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white', padding: 5 }}>
            <View style={style.container}>
                <View style={style.headerTextContainer}>
                    <Text style={style.headerText}>{courseTitle}</Text>
                </View>
                <View>
                    <Text style={style.subText}>
                        Class Agendas for the Week
                    </Text>
                </View>
                <View style={style.line}></View>
                {isFetchingLessons ? (
                    <View>
                        <ActivityIndicator size="large" color="#0000ff" />
                    </View>
                ) : lessons.length === 0 ? (
                    <View style={style.emptyContainer}>
                        <Image
                            style={style.image}
                            source={require('../../../../assets/images/people.jpg')}
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
                                    <Text style={style.timeText}>{times}</Text>
                                </View>
                            ))}
                        </View>
                    </View>
                )}
                <View style={{ padding: 10 }}>
                    <Link
                        style={style.link}
                        isExternal
                        _text={{
                            color: 'blue.400',
                        }}
                        onPress={handleLinkPress}
                    >
                        View Attendance
                    </Link>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default Timetable;
