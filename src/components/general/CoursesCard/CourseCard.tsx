import React, { useContext, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import { AuthContext } from '../../../context/AuthContext';
import { styles } from './styles';
import { CardProps } from './props';
import { getRandomColor } from '../../../services/getRandomColor';
import { CourseProvider } from '../../../context/CourseContext';

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
        <CourseProvider>
            <View style={styles.cardContainer}>
                <Card
                    style={[styles.card, { backgroundColor: cardColor }]}
                    onPress={handleCardPress}
                >
                    <Card.Content>
                        <Title style={styles.title}>{name}</Title>
                        <Paragraph style={styles.paragraph}>
                            {courseCode}
                        </Paragraph>
                    </Card.Content>
                </Card>
            </View>
        </CourseProvider>
    );
};
