import React from 'react';
import { View, FlatList } from 'react-native';
import UserItem from '../../components/lecturer/PeopleCard';
import { SafeAreaView } from 'react-native-safe-area-context';

const PeopleScreen = () => {
    const users = [
        {
            id: 1,
            name: 'Blay Albert',
        },
        {
            id: 2,
            name: 'Kelvin Nem',
        },
        {
            id: 3,
            name: 'Jane Smith',
        },
        {
            id: 4,
            name: 'Jane Smith',
        },
        {
            id: 5,
            name: 'Jane Smith',
        },
        {
            id: 6,
            name: 'Jane Smith',
        },
        {
            id: 7,
            name: 'Lord John',
        },
        {
            id: 8,
            name: 'Kwame Safo',
        },
        {
            id: 9,
            name: 'Blay Albert Kangah',
        },
    ];
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <View>
                <FlatList
                    data={users}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) => <UserItem name={item.name} />}
                />
            </View>
        </SafeAreaView>
    );
};

export default PeopleScreen;
