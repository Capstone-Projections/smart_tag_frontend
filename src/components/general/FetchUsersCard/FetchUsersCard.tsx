import React from 'react';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';

interface Props {
    onPress: () => void;
}

export const FetchUsersCard: React.FC<Props> = ({ onPress }) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.cardContainer}>
                <Text style={styles.cardText}>Press to Fetch Users</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#e0e0e0',
        padding: 16,
        borderRadius: 8,
    },
    cardText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});
