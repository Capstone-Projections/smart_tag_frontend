import { View } from 'react-native';
import React from 'react';
import CoursesList from '../../../components/general/Courses/Courses';
//TODO: this also shouldn't exist since the Courses List can be used like that so the courses list should replace this as the screen instead of having this here that just calls it
export default function CoursesScreen() {
    return (
        <View>
            <CoursesList />
        </View>
    );
}
