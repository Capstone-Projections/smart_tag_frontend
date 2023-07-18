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
    iconName: IconNames; // Use the IconNames union type here
    value: string;
}

const PopOver: React.FC<Props> = ({ text, iconName, value }) => {
    const { IDcourse } = React.useContext(CourseContext);
    const { authorizationKey } = React.useContext(AuthContext);

    const handleDelete = async () => {
        try {
            const headers = { Authorization: `${authorizationKey}` };
            const response = await axios.delete(
                `https://smart-tag.onrender.com/courses/${IDcourse}`,
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