import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { MenuOption } from 'react-native-popup-menu';
import { Entypo } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';
import axios from 'axios';
import { CourseContext } from '../../../context/CourseContext';
import { AuthContext } from '../../../context/AuthContext';
import { LessonContext } from '../../../context/LessonContext';
import { LessonContextForLecturers } from '../../../context/LessonContextForLecturers';

type IconNames = 'emoji-sad';

interface Props {
    text: string;
    iconName: IconNames;
    value: string;
    IDcourse: string;
    idlesson: string;
    idLessonForLecturer: string;
}

const TimeTablePopOver: React.FC<Props> = ({
    text,
    iconName,
    IDcourse,
    idLessonForLecturer,
}) => {
    // const { IDcourse } = React.useContext(CourseContext);
    const { authorizationKey, userID } = React.useContext(AuthContext);
    const { idlesson } = React.useContext(LessonContext);

    // const { idLessonForLecturers } = React.useContext(
    //     LessonContextForLecturers
    // );

    const handleDelete = async () => {
        try {
            const headers = { Authorization: `${authorizationKey}` };
            const response = await axios.delete(
                `https://smart-tag.onrender.com/lesson/course/${IDcourse}/${idLessonForLecturer}`,
                { headers }
            );
            console.log('Delete response:', response.data);
        } catch (error) {
            console.error('Error deleting data:', error);
        }
    };

    return (
        <MenuOption
            onSelect={handleDelete}
            customStyles={{
                optionWrapper: {
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    height: 45,
                },
            }}
        >
            <Text>{text}</Text>
            <Entypo name={iconName} size={24} color="black" />
        </MenuOption>
    );
};

const styles = StyleSheet.create({});

export default TimeTablePopOver;
