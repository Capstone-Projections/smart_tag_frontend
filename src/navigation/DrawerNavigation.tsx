import { View, Text } from 'react-native';
import {
    DrawerItemList,
    createDrawerNavigator,
} from '@react-navigation/drawer';
import CoursesList from '../components/general/Courses/Courses';
import AddCourse from '../screens/studentScreens/AddCourse/AddCourseScreen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { SafeAreaView } from 'react-native-safe-area-context';
import Settings from '../screens/general/Settings/Settings';
import ProfileScreen from '../screens/general/Profile/ProfileScreen';
import { MenuProvider } from 'react-native-popup-menu';

const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
    return (
        <MenuProvider>
            <Drawer.Navigator
                drawerContent={props => {
                    return (
                        <SafeAreaView>
                            <View
                                style={{
                                    height: 50,
                                    marginLeft: 15,
                                    justifyContent: 'center',
                                    alignContent: 'center',
                                    borderBottomWidth: 1,
                                    borderBottomColor: 'grey',
                                    marginBottom: 15,
                                }}
                            >
                                <Text
                                    style={{
                                        fontFamily: 'Poppins',
                                        fontSize: 24,
                                        textAlign: 'left',
                                        marginVertical: 6,
                                    }}
                                >
                                    Smart Tag
                                </Text>
                            </View>
                            <DrawerItemList {...props} />
                        </SafeAreaView>
                    );
                }}
                screenOptions={{
                    headerTitleAlign: 'center',
                    swipeEnabled: true,
                    headerTitleStyle: { fontFamily: 'Poppins' },
                    headerStyle: {
                        borderBottomWidth: 0.5,
                        borderBottomColor: 'grey',
                    },
                    drawerActiveTintColor: '#196B9A',
                    drawerLabelStyle: {
                        color: 'black',
                    },
                    drawerContentContainerStyle: {},
                }}
                initialRouteName="Courses"
            >
                <Drawer.Screen
                    name="Courses"
                    options={{
                        drawerIcon: ({ color, size }) => {
                            return (
                                <Icon name="school" size={size} color={color} />
                            );
                        },
                    }}
                    component={CoursesList}
                />
                {/* <Drawer.Screen
                name="Add Course"
                options={{
                    drawerIcon: ({ color, size }) => {
                        return (
                            <Icon
                                name="plus-circle"
                                size={size}
                                color={color}
                            />
                        );
                    },
                }}
                component={AddCourse}
            /> */}
                <Drawer.Screen
                    name="Profile"
                    options={{
                        drawerIcon: ({ color, size }) => {
                            return (
                                <Icon
                                    name="plus-circle"
                                    size={size}
                                    color={color}
                                />
                            );
                        },
                    }}
                    component={ProfileScreen}
                />
                {/* <Drawer.Screen
                    name="Settings"
                    options={{
                        drawerIcon: ({ color, size }) => {
                            return (
                                <Icon name="cog" size={size} color={color} />
                            );
                        },
                    }}
                    component={Settings}
                /> */}
            </Drawer.Navigator>
        </MenuProvider>
    );
};

export default DrawerNavigation;
