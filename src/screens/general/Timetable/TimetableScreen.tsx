import { View, Text } from 'react-native';
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

const Timetable = (props: TimetableProps) => {
    const { authorizationKey } = useContext(AuthContext);
    const { IDcourse, courseTitle } = useContext(CourseContext);
    const { setDays } = useContext(TimetableDaysContext);
    const { setLessonRoomId } = useContext(LessonRoomContext);
    const [lessons, setLessons] = useState<ReturnProps[]>([]);
    const [isDaysSet, setIsDaysSet] = useState(false);
    const { setIdLesson } = useContext(LessonContext);

    useEffect(() => {
        const fetchLessonsForCourse = async () => {
            const headers = { Authorization: `${authorizationKey}` };

            try {
                const response = await axios.get(
                    `https://smart-tag.onrender.com/lessons/course/${IDcourse}`,
                    { headers }
                );
                setLessons(response.data);
            } catch (error) {
                console.error(
                    'Failed to fetch lessons for this course:',
                    error
                );
            }
        };

        if (props.navigation.isFocused()) {
            fetchLessonsForCourse();
        }
    }, [props.navigation, authorizationKey, IDcourse]);

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
        <View style={style.container}>
            <SafeAreaView>
                <View style={{ paddingTop: 20, paddingBottom: 10 }}>
                    <Text style={style.headerText}>{courseTitle}</Text>
                </View>
                <View style={{ paddingBottom: 30 }}>
                    <Text style={style.subText}>
                        Class Agendas for the Week
                    </Text>
                </View>
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
                                <Text style={style.timeText}>{timeRanges}</Text>
                            </View>
                        ))}
                    </View>
                </View>
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
            </SafeAreaView>
        </View>
    );
};

export default Timetable;
