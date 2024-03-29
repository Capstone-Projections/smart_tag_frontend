import React, { useContext, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Text, View } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import { AuthContext } from '../../../context/AuthContext';
import { styles } from './styles';
import { CardProps } from './props';
import { getRandomColor } from '../../../services/getRandomColor';
import { CourseContext } from '../../../context/CourseContext';
import {
    appBlue,
    coursesdBlue,
    coursesdBlue2,
    coursesdGreen,
    coursesdYellow,
} from '../../../resources/colors/colors';
import CustomPopOver from '../PopOverMenu/CustomPopOver';
import { TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { TouchableOpacity } from 'react-native-gesture-handler';

export const CourseCard: React.FC<CardProps> = ({
    name,
    courseCode,
    idcourse,
}) => {
    const colors = [
        appBlue,
        coursesdBlue,
        coursesdBlue2,
        coursesdGreen,
        coursesdYellow,
    ];
    const [cardColor, setCardColor] = useState(getRandomColor(colors));
    const navigation = useNavigation() as any;
    const { userType } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(false);
    const { setIdCourse, IDcourse, setCourseTitle } = useContext(CourseContext);

    const handleCardPress = () => {
        setCourseTitle(name);
        if (idcourse) {
            setIdCourse(idcourse);
        }
        if (userType === 'student') {
            navigation.navigate('TabBar');
        } else {
            {
                navigation.navigate('LecturerBottomTab');
            }
        }
    };

    return (
        <View>
            <TouchableOpacity
                style={styles.cardContainer}
                onPress={handleCardPress}
            >
                <View style={[styles.card, { backgroundColor: cardColor }]}>
                    <Card.Content>
                        <Title style={styles.title}>{name}</Title>
                        <Paragraph style={styles.paragraph}>
                            {courseCode}
                        </Paragraph>
                    </Card.Content>
                </View>
            </TouchableOpacity>
            <View style={styles.popoverContainer}>
                <CustomPopOver idcourse={idcourse} />
            </View>
        </View>
    );
};
