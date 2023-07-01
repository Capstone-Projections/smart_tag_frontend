import React, { useContext, useEffect, useState } from 'react';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { View, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import { AuthContext } from './AuthContext';
import axios from 'axios';

interface Props {
    name: string;
    courseCode: string;
}

const getRandomColor = () => {
    // TODO:use colors that have already been defined inside of the Theme context of the app
    const colors = ['#157B80', '#32AC71', '#1D6CA7', '#ECA235'];

    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
};

const CourseCard: React.FC<Props> = ({ name, courseCode }) => {
    const [cardColor, setCardColor] = useState(getRandomColor());
    const navigation = useNavigation() as any;
    const { setCourseTitle } = useContext(AuthContext);

    const handleCardPress = () => {
        setCourseTitle(name);
        navigation.navigate('TabBar');
    };

    return (
        <View style={styles.cardContainer}>
            <Card
                style={[styles.card, { backgroundColor: cardColor }]}
                onPress={handleCardPress}
            >
                <Card.Content>
                    <Title style={styles.title}>{name}</Title>
                    <Paragraph style={styles.paragraph}>{courseCode}</Paragraph>
                </Card.Content>
            </Card>
        </View>
    );
};

const CoursesList = () => {
    const { userID, authorizationKey } = useContext(AuthContext);
    const [courses, setCourses] = useState<Props[]>([]);
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
        //TODO: don't make the fetching of courses dependent on the change of userID because that isn't likely at all to happen
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
                {courses.map((course, index) => (
                    <CourseCard
                        key={index}
                        name={course.name}
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
