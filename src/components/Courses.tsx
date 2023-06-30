import React, { useContext, useEffect, useState } from 'react';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import { AuthContext } from './AuthContext';
import axios from 'axios';

interface Props {
    courseName: string;
    courseCode: string;
    lecturer: string;
}

const getRandomColor = () => {
    const colors = ['#157B80', '#32AC71', '#1D6CA7', '#ECA235'];

    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
};

const CourseCard: React.FC<Props> = ({ courseName, courseCode, lecturer }) => {
    const cardColor = getRandomColor();
    const navigation = useNavigation() as any;
    const { setCourseTitle } = useContext(AuthContext);

    const handleCardPress = () => {
        setCourseTitle(courseName);
        navigation.navigate('Time');
    };

    return (
        <View style={styles.cardContainer}>
            <Card
                style={[styles.card, { backgroundColor: cardColor }]}
                onPress={handleCardPress}
            >
                <Card.Content>
                    <Title style={styles.title}>{courseName}</Title>
                    <Paragraph style={styles.paragraph}>{lecturer}</Paragraph>
                    <Paragraph style={styles.paragraph}>{courseCode}</Paragraph>
                </Card.Content>
            </Card>
        </View>
    );
};

const CoursesList = () => {
    const { userID } = useContext(AuthContext);
    const [courses, setCourses] = useState<Props[]>([]);

    useEffect(() => {
        // Make an API request to fetch courses based on the userID
        const fetchCourses = async () => {
            try {
                const response = await axios.get(
                    `https://smart-tag.onrender.com/courses/${userID}`
                );
                setCourses(response.data);
            } catch (error) {
                console.error('Failed to fetch courses:', error);
            }
        };

        fetchCourses();
    }, [userID]);

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {courses.map((course, index) => (
                    <CourseCard
                        key={index}
                        courseName={course.courseName}
                        courseCode={course.courseCode}
                        lecturer={course.lecturer}
                    />
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        paddingTop: 0,
        paddingBottom: 0,
        marginBottom: 0,
    },
    headerText: {
        fontSize: 24,
        // fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
    },
    cardContainer: {
        marginBottom: 16,
    },
    card: {
        width: 344,
        height: 146,
    },
    title: {
        color: 'white',
    },
    paragraph: {
        color: 'white',
    },
});

export default CoursesList;
