import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { MenuOption } from 'react-native-popup-menu';
import { Entypo } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';
import axios from 'axios';
import { CourseContext } from '../../../context/CourseContext';
import { AuthContext } from '../../../context/AuthContext';

type IconNames = 'emoji-sad';

interface Props {
    text: string;
    iconName: IconNames;
    value: string;
    idcourse: string;
}

const PopOver: React.FC<Props> = ({ text, iconName, idcourse }) => {
    const { IDcourse } = React.useContext(CourseContext);
    const { authorizationKey, userID } = React.useContext(AuthContext);
    console.log('sdsdsdssds' + authorizationKey);

    const handleDelete = async () => {
        try {
            const headers = { Authorization: `${authorizationKey}` };
            const response = await axios.delete(
                `https://smart-tag.onrender.com/courses/${idcourse}/${userID}`,
                { headers }
            );
            console.log('Delete response:', response.data);
        } catch (error) {
            console.error('Error deleting data:', error);
        }
    };

    return (
        <MenuOption
            onSelect={handleDelete}
            customStyles={{
                optionWrapper: {
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    height: 45,
                },
            }}
        >
            <Text>{text}</Text>
            <Entypo name={iconName} size={24} color="black" />
        </MenuOption>
    );
};

const styles = StyleSheet.create({});

export default PopOver;
