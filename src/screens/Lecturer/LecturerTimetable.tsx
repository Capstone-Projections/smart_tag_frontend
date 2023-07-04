import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link, Button } from 'native-base';
import { CourseContext } from '../../context/CourseContext';

interface LecturerTimetableProps {
    navigation: any;
}
//TODO: This file also shouldn't exist because the timetable page from the student section should be reused
const LecturerTimetable = (props: LecturerTimetableProps) => {
    const { courseTitle } = React.useContext(CourseContext);

    const daysOfWeek = ['Mon:', 'Tue:', 'Wed:', 'Thur:', 'Fri:'];
    const times = [
        '10:30-12:30',
        'No Class',
        '1:00-3:00',
        'No Class',
        'No Class',
    ];

    const handleLinkPress = () => props.navigation.navigate('View');

    return (
        <View style={style.container}>
            <SafeAreaView>
                <View style={{ paddingTop: 20, paddingBottom: 10 }}>
                    <Text style={style.headerText}>{courseTitle}</Text>
                </View>
                <View style={{ paddingBottom: 30 }}>
                    <Text style={style.normalText}>
                        Class Agendas for the Week
                    </Text>
                </View>
                <View style={style.direction}>
                    <View style={style.dayColumn}>
                        {daysOfWeek.map((day, index) => (
                            <View key={index} style={style.card}>
                                <Text style={style.dayText}>{day}</Text>
                            </View>
                        ))}
                    </View>
                    <View style={style.timeColumn}>
                        {times.map((time, index) => (
                            <View key={index} style={style.card}>
                                <Text style={style.timeText}>{time}</Text>
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

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingHorizontal: 10,
    },
    headerText: {
        textAlign: 'center',
        fontFamily: 'Poppins',
        fontWeight: '600',
        fontSize: 20,
    },
    normalText: {
        textAlign: 'center',
        fontFamily: 'Poppins',
        fontWeight: '400',
        fontSize: 16,
    },

    direction: {
        flexDirection: 'row',
    },
    card: {
        backgroundColor: '#1D6CA7',
        borderRadius: 5,
        marginBottom: 10,
        padding: 10,
    },
    dayColumn: {
        flex: 1,
        marginRight: 5,
    },
    timeColumn: {
        flex: 2,
        marginLeft: 5,
    },
    dayText: {
        fontSize: 16,
        textAlign: 'center',
        color: 'white',
        fontFamily: 'Poppins',
    },
    timeText: {
        fontSize: 16,
        textAlign: 'center',
        color: 'white',
        fontFamily: 'Poppins',
    },
    link: {
        justifyContent: 'center',
        fontFamily: 'Poppins',
    },
});

export default LecturerTimetable;
