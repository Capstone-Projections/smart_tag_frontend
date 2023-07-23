import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import {
    Menu,
    MenuProvider,
    MenuOptions,
    MenuTrigger,
} from 'react-native-popup-menu';
import { Entypo } from '@expo/vector-icons';
import PopOver from './PopOver';

const Divider = () => <View style={styles.divider} />;

interface CustomPopOverProps {
    idcourse: string;
}

const CustomPopOver = ({ idcourse }: CustomPopOverProps) => {
    return (
        <Menu>
            <MenuTrigger
                customStyles={{
                    triggerWrapper: {
                        // top: -20,
                    },
                }}
            >
                <Entypo name="dots-three-vertical" size={26} color="white" />
            </MenuTrigger>
            <MenuOptions
                customStyles={{
                    optionsContainer: {
                        borderRadius: 10,
                    },
                }}
            >
                <PopOver
                    text="Delete"
                    value="Delete"
                    iconName="emoji-sad"
                    idcourse={idcourse}
                />
            </MenuOptions>
        </Menu>
    );
};

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        backgroundColor: '#fff',
        marginVertical: 100,
        marginHorizontal: 100,
    },
    divider: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: '#7F8487',
    },
});

export default CustomPopOver;
