import React, {
    useCallback,
    useContext,
    useEffect,
    useRef,
    useState,
} from 'react';
import {
    View,
    ScrollView,
    RefreshControl,
    Text,
    ActivityIndicator,
} from 'react-native';
import { AuthContext } from '../../../context/AuthContext';
import axios from 'axios';
import { styles } from './styles';
import { CardProps } from '../CoursesCard/props';
import { CourseCard } from '../CoursesCard/CourseCard';
import { useQuery } from 'react-query';
import BottomSheetComponent from '../FloatingButton/Float';
import { useNavigation } from '@react-navigation/native';

const CoursesList = () => {
    const { userID, authorizationKey } = useContext(AuthContext);

    const navigation = useNavigation();

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

    if (isLoading && courses.length === 0) {
        // Show loading indicator while fetching courses
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="blue" />
            </View>
        );
    }

    if (courses.length === 0) {
        // Show a message when there are no courses
        return (
            <View style={styles.emptycontainer}>
                <ScrollView
                    contentContainerStyle={styles.scrollViewContent}
                    refreshControl={
                        <RefreshControl
                            refreshing={isLoading}
                            onRefresh={onRefresh}
                        />
                    }
                >
                    <View style={styles.noCoursesContainer}>
                        <Text style={styles.noCoursesText}>
                            No courses available
                        </Text>
                    </View>
                    <BottomSheetComponent navigation={navigation} />
                </ScrollView>
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
            <BottomSheetComponent navigation={navigation} />
        </View>
    );
};

export default CoursesList;
