import { StyleSheet, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { appBlue } from '../../../resources/colors/colors';

import { MaterialCommunityIcons } from '@expo/vector-icons';

interface FloatingButtonProps {
    onPress: () => void;
}

const FloatingButton: React.FC<FloatingButtonProps> = ({ onPress }) => {
    return (
        <View>
            <TouchableOpacity style={styles.circles} onPress={onPress}>
                <MaterialCommunityIcons name="plus" size={40} color="white" />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    circles: {
        backgroundColor: appBlue,
        width: 60,
        height: 60,
        position: 'absolute',
        bottom: 30,
        right: 10,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default FloatingButton;
