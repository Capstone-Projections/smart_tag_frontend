import { View, Text, StyleSheet } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from 'native-base';
import { AuthContext } from '../../../context/AuthContext';
import { style } from './styles';
import { ReturnProps, TimetableProps } from './props';
import { CourseContext } from '../../../context/CourseContext';
import axios from 'axios';
import { transformLessonData } from '../../../services/timeTableDisplay';

const Timetable = (props: TimetableProps) => {
    //TODO: this should be in the course context instead of the AuthContext so move it
    const { courseTitle, authorizationKey } = useContext(AuthContext);
    const { IDcourse } = useContext(CourseContext);
    const [lessons, setLessons] = useState<ReturnProps[]>([]);

    useEffect(() => {
        const fetchLessonsForCourse = async () => {
            const headers = { Authorization: `${authorizationKey}` };

            try {
                const response = await axios.get(
                    `https://smart-tag.onrender.com/lessons/course/${IDcourse}`,
                    { headers }
                );
                // console.log(response.data);
                setLessons(response.data);

                console.log(days); // Array of days
                console.log(timeRanges); // Array of time ranges
            } catch (error) {
                console.error(
                    'Failed to fetch lessons for this course:',
                    error
                );
            }
        };

        fetchLessonsForCourse();
        //TODO: as it currently working it runs any time the card is clicked on which is a bad thing.. make it such that it runs only once when the card is clicked on
    }, [IDcourse]);
    const { days, timeRanges } = transformLessonData(lessons);

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
