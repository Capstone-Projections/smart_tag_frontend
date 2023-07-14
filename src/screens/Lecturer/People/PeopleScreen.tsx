import React from 'react';
import {
    View,
    FlatList,
    Text,
    TouchableOpacity,
    Image,
    RefreshControl,
} from 'react-native';
import UserItem from '../../../components/lecturer/PeopleCard';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CourseContext } from '../../../context/CourseContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { styles } from './styles';
import { User, PeopleProps } from './props';
import { useQuery } from 'react-query';
import { AuthContext } from '../../../context/AuthContext';
import axios from 'axios';
import { Button } from 'native-base';

const PeopleScreen = (props: PeopleProps) => {
    const { courseTitle, IDcourse } = React.useContext(CourseContext);
    const { authorizationKey } = React.useContext(AuthContext);
    const [refreshing, setRefreshing] = React.useState(false);

    const fetchStudents = async () => {
        try {
            const headers = { Authorization: `${authorizationKey}` };
            const response = await axios.get(
                `https://smart-tag.onrender.com/courses/users/${IDcourse}`,
                { headers }
            );
            return response.data.map((user: User) => ({
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
            }));
        } catch (error) {
            throw new Error('Failed to fetch students for this course');
        }
    };

    const {
        data: users = [],
        isLoading: isFetchingLessons,
        isError,
        error,
        refetch,
    } = useQuery<User[]>(['students', IDcourse], fetchStudents);

    const handleRetry = () => {
        refetch();
    };

    const handlePress = () => {
        props.navigation.navigate('Manual');
    };

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        refetch()
            .then(() => {
                setRefreshing(false);
            })
            .catch(() => {
                setRefreshing(false);
            });
    }, []);

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
                {isError ? (
                    <View style={styles.emptyContainer}>
                        <Text>Failed to fetch students for this course.</Text>
                        <TouchableOpacity onPress={handleRetry}>
                            <Text>Retry</Text>
                        </TouchableOpacity>
                    </View>
                ) : users.length > 0 ? (
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        style={{ paddingTop: 2 }}
                        data={users}
                        keyExtractor={(_, index) => index.toString()}
                        renderItem={({ item }) => (
                            <UserItem
                                firstName={item.firstName}
                                lastName={item.lastName}
                            />
                        )}
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={onRefresh}
                            />
                        }
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
