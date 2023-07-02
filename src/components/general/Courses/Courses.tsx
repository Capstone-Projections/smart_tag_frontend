import React, { useContext, useEffect, useState } from 'react';
import { View, ScrollView, RefreshControl } from 'react-native';
import { AuthContext } from '../../../context/AuthContext';
import axios from 'axios';
import { styles } from './styles';
import { CardProps } from '../CoursesCard/props';
import { CourseCard } from '../CoursesCard/CourseCard';
import { CourseContext, CourseProvider } from '../../../context/CourseContext';

const CoursesList = () => {
    const { userID, authorizationKey } = useContext(AuthContext);
    const [courses, setCourses] = useState<CardProps[]>([]);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        const fetchCourses = async () => {
            const headers = { Authorization: `${authorizationKey}` };

            try {
                const response = await axios.get(
                    `https://smart-tag.onrender.com/courses/${userID}`,
                    { headers }
                );
                setCourses(response.data);
            } catch (error) {
                console.error('Failed to fetch courses:', error);
            }
        };

        fetchCourses();
    }, [userID]);

    const onRefresh = async () => {
        setRefreshing(true);
        try {
            const response = await axios.get(
                `https://smart-tag.onrender.com/courses/${userID}`,
                { headers: { Authorization: `${authorizationKey}` } }
            );
            setCourses(response.data);
        } catch (error) {
            console.error('Failed to fetch courses:', error);
        }
        setRefreshing(false);
    };

    return (
        <View style={styles.container}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            >
                {courses.map((course, index) => {
                    return (
                        <CourseCard
                            key={index}
                            name={course.name}
                            courseCode={course.courseCode}
                            idcourse={course.idcourse}
                        />
                    );
                })}
            </ScrollView>
        </View>
    );
};

export default CoursesList;
