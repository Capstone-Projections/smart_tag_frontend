import React, { useContext, useEffect, useState } from 'react';
import { View, ScrollView, RefreshControl, Text } from 'react-native';
import { AuthContext } from '../../../context/AuthContext';
import axios from 'axios';
import { styles } from './styles';
import { CardProps } from '../CoursesCard/props';
import { CourseCard } from '../CoursesCard/CourseCard';
import { useQuery } from 'react-query';
import { Image } from 'react-native';

const CoursesList = () => {
    const { userID, authorizationKey } = useContext(AuthContext);

    const fetchCourses = async () => {
        const headers = { Authorization: `${authorizationKey}` };
        const response = await axios.get(
            `https://smart-tag.onrender.com/courses/${userID}`,
            { headers }
        );
        return response.data;
    };

    const {
        data: courses = [],
        isLoading,
        isError,
        error,
        refetch,
    } = useQuery<CardProps[]>('courses', fetchCourses);

    useEffect(() => {
        if (isError) {
            console.error('Failed to fetch courses:', error);
        }
    }, [isError, error]);

    const onRefresh = async () => {
        try {
            await refetch();
        } catch (error) {
            console.error('Failed to fetch courses:', error);
        }
    };

    if (courses.length === 0) {
        return (
            <View style={styles.emptyContainer}>
                <Image
                    style={styles.image}
                    source={require('../../../../assets/images/people.jpg')}
                />
                <Text style={styles.emptyText}>No courses to display.</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl
                        refreshing={isLoading}
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
