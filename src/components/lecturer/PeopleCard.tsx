import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; // Import MaterialIcons from expo/vector-icons
import {
    appBlue,
    coursesdBlue,
    coursesdBlue2,
    coursesdYellow,
} from '../../resources/colors/colors';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface Props {
    firstName: string;
    lastName: string;
}

const UserItem: React.FC<Props> = ({ firstName, lastName }) => {
    return (
        <TouchableOpacity onPress={() => {}} activeOpacity={0.5}>
            <View style={styles.container}>
                <View style={styles.avatar}>
                    <MaterialIcons name="person" size={40} color="#005DB4" />
                </View>
                <Text style={styles.name}>
                    {firstName} {lastName}
                </Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
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
    name: {
        fontSize: 16,
        fontFamily: 'Poppins',
        color: 'black',
    },
});

export default UserItem;
