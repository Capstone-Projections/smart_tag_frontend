import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

const ViewAttendance = () => {
    return (
        <View style={style.container}>
            <SafeAreaView>
                <View style={{ paddingHorizontal: 20 }}>
                    <Text style={style.text}>Number of Attended Classes:</Text>
                    <View style={style.card}>
                        <Text style={style.attendanceText}>15</Text>
                    </View>
                </View>
                <View style={{ paddingHorizontal: 20 }}>
                    <Text style={style.text}>Number of Missed Classes:</Text>
                    <View style={style.card}>
                        <Text style={style.missedText}>1</Text>
                    </View>
                </View>
                <View style={{ paddingHorizontal: 20 }}>
                    <Text style={style.text}>Number of Chances Classes:</Text>
                    <View style={style.card}>
                        <Text style={style.chancesText}>2</Text>
                    </View>
                </View>
            </SafeAreaView>
        </View>
    );
};

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingTop: 30,
    },
    card: {
        backgroundColor: '#70D361',
        borderRadius: 5,
        marginBottom: 20,
        padding: 10,
        width: 87,
        height: 50,
    },
    text: {
        fontFamily: 'Poppins',
        fontSize: 16,
        paddingBottom: 15,
    },
    attendanceText: {
        color: 'green',
        fontFamily: 'Poppins',
        fontSize: 18,
    },
    missedText: {
        color: '#225DE1',
        fontFamily: 'Poppins',
        fontSize: 18,
    },
    chancesText: {
        color: '#FF0000',
        fontFamily: 'Poppins',
        fontSize: 18,
    },
});

export default ViewAttendance;
