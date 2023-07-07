import React from 'react';
import {
    View,
    FlatList,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
} from 'react-native';
import UserItem from '../../../components/lecturer/PeopleCard';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CourseContext } from '../../../context/CourseContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { styles } from './styles';
import { User, PeopleProps } from './props';

const PeopleScreen = (props: PeopleProps) => {
    const { courseTitle } = React.useContext(CourseContext);
    const users: User[] = [];

    const handlePress = () => {
        props.navigation.navigate('Manual');
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white', padding: 5 }}>
            <View style={styles.container}>
                <View style={styles.headerTextContainer}>
                    <Text style={styles.headerText}>{courseTitle} </Text>
                </View>
                <View style={styles.subTextContainer}>
                    <Text style={styles.subText}>Students:</Text>

                    <TouchableOpacity onPress={handlePress}>
                        <MaterialCommunityIcons name="plus-circle" size={30} />
                    </TouchableOpacity>
                </View>
                <View style={styles.line}></View>
                {users.length > 0 ? (
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        style={{ paddingTop: 2 }}
                        data={users}
                        keyExtractor={item => item.id.toString()}
                        renderItem={({ item }) => <UserItem name={item.name} />}
                    />
                ) : (
                    <View style={styles.emptyContainer}>
                        <Image
                            style={styles.image}
                            source={require('../../../../assets/images/people.jpg')}
                        />
                        <Text style={styles.emptyText}>
                            No students' attendance recorded yet.
                        </Text>
                    </View>
                )}
            </View>
        </SafeAreaView>
    );
};

export default PeopleScreen;
