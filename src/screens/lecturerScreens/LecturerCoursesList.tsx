import { View, Text, StyleSheet, ScrollView } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Card, Title, Paragraph } from 'react-native-paper';

interface Props {
    courseName: string;
    courseCode: string;
}

const getRandomColor = () => {
    const colors = ['#157B80', '#32AC71', '#1D6CA7', '#ECA235'];

    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
};

const CourseCard: React.FC<Props> = ({ courseName, courseCode }) => {
    const cardColor = getRandomColor();
    const navigation = useNavigation() as any;

    return (
        <View style={styles.cardContainer}>
            <Card
                style={[styles.card, { backgroundColor: cardColor }]}
                onPress={() => navigation.navigate('LecturerBottomTab')}
            >
                <Card.Content>
                    <Title style={styles.title}>{courseName}</Title>
                    <Paragraph style={styles.paragraph}>{courseCode}</Paragraph>
                </Card.Content>
            </Card>
        </View>
    );
};

const LecturerCoursesList = () => {
    let courses = [
        { courseName: 'Computer Networking', courseCode: 'COE475' },
        { courseName: 'Artificial Intelligence', courseCode: 'COE436' },
        { courseName: 'Introduction to Programming', courseCode: 'COE421' },
        { courseName: 'Introduction to Programming', courseCode: 'COE421' },
        { courseName: 'Introduction to Programming', courseCode: 'COE421' },
    ];

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {courses.map((course, index) => (
                    <CourseCard
                        key={index}
                        courseName={course.courseName}
                        courseCode={course.courseCode}
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
        marginBottom: 16,
        textAlign: 'center',
    },
    cardContainer: {
        marginBottom: 16,
    },
    card: {
        width: 344,
        height: 120,
    },
    title: {
        color: 'white',
    },
    paragraph: {
        color: 'white',
    },
    scrollView: {
        display: 'none',
    },
    scrollViewContent: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default LecturerCoursesList;
