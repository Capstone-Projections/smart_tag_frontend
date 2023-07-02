import { View } from 'react-native';
import { styles } from './styles';
import { Text } from 'react-native-paper';
import BarcodeScanner from '../../../components/Student/BarCodeScanner/BarCodeScanner';
import { LessonContext } from '../../../context/LessonContext';
import { TimetableDaysContext } from '../../../context/TimeTableContext';
import React, { useContext } from 'react';
import getCurrentDay from '../../../services/currentDay';
import { AuthContext } from '../../../context/AuthContext';
import { LessonRoomContext } from '../../../context/LectureRoomContext';

export function QRCodeScreen() {
    const { days } = useContext(TimetableDaysContext);
    const { idlesson } = useContext(LessonContext);
    const { userID } = useContext(AuthContext);
    const { lessonRoomId } = useContext(LessonRoomContext);
    const today = getCurrentDay();

    // console.log(lessonRoomId)
    //TODO: make this look nice later on and add toasting and whatever
    const handleQRCodeScanned = (data: string) => {
        if (data === lessonRoomId) {
            console.log('scanned');
            console.log(userID);
            console.log(lessonRoomId);
            if (days.includes(today)) {
            } else {
                console.log('there is not class today');
            }
        } else {
            alert('Wrong QR Code');
        }
    };

    return (
        <View style={styles.container}>
            <BarcodeScanner
                boxSize={200}
                boxPosition={{
                    top: '35%',
                    left: '-32%',
                    transform: [{ translateX: -50 }, { translateY: -50 }],
                }}
                onQRCodeScanned={handleQRCodeScanned}
            />
            <Text style={styles.text}>
                Scan QR Code to take your Attendance
            </Text>
        </View>
    );
}
