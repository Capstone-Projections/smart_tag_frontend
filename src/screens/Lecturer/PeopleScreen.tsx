import React from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import UserItem from '../../components/lecturer/PeopleCard';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthContext } from '../../context/AuthContext';
import { ScrollView } from 'react-native-gesture-handler';
import { CourseContext } from '../../context/CourseContext';

const PeopleScreen = () => {
    const { courseTitle } = React.useContext(CourseContext);
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
            name: 'Vincent John',
        },
        {
            id: 8,
            name: 'Kwame Safo',
        },
        {
            id: 9,
            name: 'Blay Albert Kangah',
        },
        {
            id: 10,
            name: 'Safa',
        },
        {
            id: 11,
            name: 'Dzifa Kwame',
        },
    ];
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white', padding: 5 }}>
            <View style={styles.container}>
                <View style={{ paddingTop: 10, paddingBottom: 10 }}>
                    <Text style={styles.headerText}>{courseTitle} </Text>
                </View>
                <Text style={styles.subText}>Enrolled Students:</Text>
                <View style={styles.line}></View>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    style={{ paddingTop: 2 }}
                    data={users}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) => <UserItem name={item.name} />}
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 4,
    },
    headerText: {
        textAlign: 'center',
        fontFamily: 'Poppins',
        fontWeight: '600',
        fontSize: 20,
    },
    subText: {
        textAlign: 'left',
        fontFamily: 'Poppins',
        fontWeight: '600',
        fontSize: 16,
    },
    line: {
        borderBottomWidth: 1,
        borderBottomColor: 'lightgray',
        marginVertical: 0,
    },
});

export default PeopleScreen;
