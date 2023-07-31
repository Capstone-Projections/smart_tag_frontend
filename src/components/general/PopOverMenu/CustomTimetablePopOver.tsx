import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import {
    Menu,
    MenuProvider,
    MenuOptions,
    MenuTrigger,
} from 'react-native-popup-menu';
import { Entypo } from '@expo/vector-icons';
import TimeTablePopOver from './TimeTablePopOver';
import { LessonContextForLecturers } from '../../../context/LessonContextForLecturers';
import { LessonContext } from '../../../context/LessonContext';
import { AuthContext } from '../../../context/AuthContext';
import { CourseContext } from '../../../context/CourseContext';

const Divider = () => <View style={styles.divider} />;

const CustomTimeTablePopOver = () => {
    const { IDcourse } = React.useContext(CourseContext);

    const { idlesson } = React.useContext(LessonContext);

    const { idLessonForLecturers } = React.useContext(
        LessonContextForLecturers
    );

    return (
        <Menu>
            <MenuTrigger
                customStyles={{
                    triggerWrapper: {
                        // top: -20,
                    },
                }}
            >
                <Entypo name="dots-three-vertical" size={26} color="white" />
            </MenuTrigger>
            <MenuOptions
                customStyles={{
                    optionsContainer: {
                        borderRadius: 10,
                    },
                }}
            >
                <TimeTablePopOver
                    text="Delete"
                    value="Delete"
                    iconName="emoji-sad"
                    IDcourse={IDcourse}
                    idlesson={idlesson}
                    idLessonForLecturer={idLessonForLecturers}
                />
            </MenuOptions>
        </Menu>
    );
};

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        backgroundColor: '#fff',
        marginVertical: 100,
        marginHorizontal: 100,
    },
    divider: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: '#7F8487',
    },
});

export default CustomTimeTablePopOver;
