import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { appBlue } from '../../../resources/colors/colors';
import { TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface Props {
    navigation: any; // You can use the appropriate type based on your navigation stack
}

const FloatingButton = (props: Props) => {
    const handlePress = () => {
        props.navigation.navigate('EditLesson');
    };

    return (
        <View>
            <TouchableOpacity
                onPress={handlePress}
                style={styles.floatingButton}
            >
                <MaterialCommunityIcons name="plus" size={30} color="white" />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    floatingButton: {
        position: 'absolute',
        bottom: 0,
        right: 14,
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: appBlue,
        alignItems: 'center',
        justifyContent: 'center',
        // elevation: 5,
    },
});

export default FloatingButton;
