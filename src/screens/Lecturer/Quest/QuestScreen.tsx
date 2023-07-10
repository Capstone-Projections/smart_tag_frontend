import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    FlatList,
    Animated,
} from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './styles';
import { QuestProps, User } from './props';
import UserItem from './Card';
import { CourseContext } from '../../../context/CourseContext';
import { whiteColor } from '../../../resources/colors/colors';

const QuestScreen = (props: QuestProps) => {
    const { courseTitle, IDcourse } = React.useContext(CourseContext);

    const users: User[] = [
        {
            id: 1,
            name: 'John  seingnd',
        },
    ];

    const handleSwipeRight = () => {
        console.log('Swiped right: Absent');
        // Update the status or perform any other logic
    };

    const handleSwipeLeft = () => {
        console.log('Swiped left: Present');
        // Update the status or perform any other logic
    };

    const renderRightActions = (progress: any, dragX: any) => {
        const scale = dragX.interpolate({
            inputRange: [-100, 0],
            outputRange: [1, 0],
            extrapolate: 'clamp',
        });
        return (
            <TouchableOpacity
                style={styles.rightAction}
                onPress={handleSwipeRight}
            >
                <Animated.Text
                    style={[styles.actionText, { transform: [{ scale }] }]}
                >
                    Absent
                </Animated.Text>
            </TouchableOpacity>
        );
    };

    const renderLeftActions = (progress: any, dragX: any) => {
        const scale = dragX.interpolate({
            inputRange: [0, 100],
            outputRange: [0, 1],
            extrapolate: 'clamp',
        });
        return (
            <TouchableOpacity
                style={styles.leftAction}
                onPress={handleSwipeLeft}
            >
                <Animated.Text
                    style={[styles.actionText, { transform: [{ scale }] }]}
                >
                    Present
                </Animated.Text>
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white', padding: 5 }}>
            <View style={{ paddingTop: 4 }}>
                <View style={styles.headerTextContainer}>
                    <Text style={styles.headerText}>{courseTitle} </Text>
                </View>
                <View style={styles.subTextContainer}>
                    <Text style={styles.subText}>Students:</Text>
                </View>
                <View style={styles.line}></View>
                {users.length > 0 ? (
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        style={{ paddingTop: 2 }}
                        data={users}
                        keyExtractor={item => item.id.toString()}
                        renderItem={({ item }) => (
                            <Swipeable
                                renderRightActions={renderRightActions}
                                renderLeftActions={renderLeftActions}
                            >
                                <UserItem name={item.name} />
                            </Swipeable>
                        )}
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

export default QuestScreen;
