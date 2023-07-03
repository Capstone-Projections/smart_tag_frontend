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
import axios from 'axios';

export function QRCodeScreen() {
    const { days } = useContext(TimetableDaysContext);
    const { idlesson } = useContext(LessonContext);
    const { userID, authorizationKey } = useContext(AuthContext);
    const { lessonRoomId } = useContext(LessonRoomContext);
    const today = getCurrentDay();

    //TODO: make this look nice later on and add toasting and whatever
    const handleQRCodeScanned = async (data: string) => {
        if (data === lessonRoomId) {
            if (days.includes(today)) {
                const payload = {
                    status: true,
                    lesson_idlesson: idlesson,
                    user_iduser: userID,
                };
                const headers = { Authorization: authorizationKey };
                try {
                    const response = await axios.post(
                        'https://smart-tag.onrender.com/attendance',
                        payload,
                        { headers }
                    );

                    // Alert success message with the user's name
                    alert(
                        `Attendance taken for ${response.data.user.firstName}`
                    );
                } catch (error) {
                    console.error('Failed to take attendance:', error);
                    // Alert error message
                    alert('Failed to take attendance');
                }
            } else {
                //TODO: let this be a pop up that says that there is no class today
                alert('You have no class at this time');
            }
        } else {
            //TODO: make this also better with the pop up that you're going to do in the future
            alert('Wrong QR Code for this class');
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
