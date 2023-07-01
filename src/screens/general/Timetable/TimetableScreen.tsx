import { View, Text, StyleSheet } from 'react-native';
import React, { useContext } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from 'native-base';
import { AuthContext } from '../../../context/AuthContext';
import { style } from './styles';
import { TimetableProps } from './props';

const Timetable = (props: TimetableProps) => {
    const { courseTitle } = useContext(AuthContext);

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
                    <Text style={style.subText}>
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

export default Timetable;
