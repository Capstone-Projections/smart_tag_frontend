import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card, Title } from 'react-native-paper';
import {
    appBlue,
    coursesdBlue,
    coursesdBlue2,
    coursesdGreen,
    coursesdYellow,
} from '../../resources/colors/colors';
import { getRandomColor } from '../../services/getRandomColor';

interface Props {
    name: string;
}

const UserItem: React.FC<Props> = ({ name }) => {
    const colors = [
        appBlue,
        coursesdBlue,
        coursesdBlue2,
        coursesdGreen,
        coursesdYellow,
    ];

    const initials = getInitials(name);
    const [cardColor, setCardColor] = useState(getRandomColor(colors));

    return (
        <View>
            <Card
                style={[styles.card, { backgroundColor: cardColor }]}
                elevation={4}
            >
                <Card.Content style={styles.cardContent}>
                    <View style={styles.avatar}>
                        <Text style={styles.initials}>{initials}</Text>
                    </View>
                    <Title style={styles.title}>{name}</Title>
                </Card.Content>
            </Card>
        </View>
    );
};

const getInitials = (name: string) => {
    const names = name.split(' ');
    const firstInitial = names[0] ? names[0][0] : '';
    const lastInitial = names[1] ? names[1][0] : '';
    return `${firstInitial}${lastInitial}`.toUpperCase();
};

const styles = StyleSheet.create({
    card: {
        marginBottom: 15,

        width: '100%', // backgroundColor: '#CBF1E1',
    },
    cardContent: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10, // justifyContent: 'center',
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    initials: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
    },
    title: {
        fontSize: 16,
    },
});

export default UserItem;
