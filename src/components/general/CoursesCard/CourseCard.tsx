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

export const CourseCard: React.FC<CardProps> = ({ name, courseCode }) => {
    const [cardColor, setCardColor] = useState(getRandomColor());
    const navigation = useNavigation() as any;
    const { setCourseTitle, userType } = useContext(AuthContext);

    const handleCardPress = () => {
        setCourseTitle(name);
        if (userType === 'student') {
            navigation.navigate('TabBar');
        } else {
            {
                navigation.navigate('LecturerBottomTab');
            }
        }
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
