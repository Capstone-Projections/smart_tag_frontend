import { View, Text,ScrollView } from 'react-native'
import { DrawerItemList, createDrawerNavigator } from 
'@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import CoursesScreen from '../screens/general/CoursesScreen';
import CoursesList from './general/Courses/Courses';
import AddCourse from '../screens/studentScreens/AddCourseScreen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { SafeAreaView } from 'react-native-safe-area-context';

const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
  return (
    <Drawer.Navigator 
    drawerContent={
      (props)=>{
        return(
          
          <SafeAreaView>
            <View style={{height:50,
            marginLeft:15,
            justifyContent:'center',
            alignContent:'center', 
            borderBottomWidth:1,
            borderBottomColor:'grey',
            marginBottom:15}}>
              <Text style={{
              fontFamily:'Poppins', 
              fontSize:24,
              textAlign:'left',
              marginVertical:6
              }}
              >Smart Tag</Text>
            </View>
            <DrawerItemList {...props}/>
          </SafeAreaView>
          
        )
      }
    }
    screenOptions={{headerTitleAlign:'center',
    swipeEnabled:true,
     headerTitleStyle:{fontFamily:'Poppins'},
     drawerActiveTintColor:'#196B9A',
     drawerLabelStyle:{
      color: 'black'
     },
     drawerContentContainerStyle:{},
     
     }} initialRouteName='Courses'>
      <Drawer.Screen name="Courses" options={{drawerIcon: ({ color, size }) => {
            return <Icon name="school" size={size} color={color} />;
          },}} component={CoursesList} />
      <Drawer.Screen name="Add Course" options={{drawerIcon: ({ color, size }) => {
            return <Icon name="plus-circle" size={size} color={color} />;
          },}} component={AddCourse} />
     </Drawer.Navigator>
  )
}

export default DrawerNavigation;