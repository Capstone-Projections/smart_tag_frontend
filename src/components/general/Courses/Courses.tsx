import React, { useContext, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, ScrollView, RefreshControl } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import { AuthContext } from '../../../context/AuthContext';
import axios from 'axios';
import { styles } from './styles';
import { CardProps } from './props';

const getRandomColor = () => {
    // TODO:use colors that have already been defined inside of the Theme context of the app
    const colors = ['#157B80', '#32AC71', '#1D6CA7', '#ECA235'];

    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
};

const CourseCard: React.FC<CardProps> = ({ name, courseCode }) => {
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

export default CoursesList;
