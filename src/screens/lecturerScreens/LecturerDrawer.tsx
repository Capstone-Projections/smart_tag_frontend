import { View, Text } from 'react-native'
import { DrawerItemList, createDrawerNavigator } from 
'@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { SafeAreaView } from 'react-native-safe-area-context';
import AddCourse from '../studentScreens/AddCourseScreen';
import LecturerCoursesList from './LecturerCoursesList';
import Settings from '../general/Settings';

const Drawer = createDrawerNavigator();

const LecturerDrawer = () => {
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
          },}} component={LecturerCoursesList} />
      <Drawer.Screen name="Add Course" options={{drawerIcon: ({ color, size }) => {
            return <Icon name="plus-circle" size={size} color={color} />;
          },}} component={AddCourse} />
           <Drawer.Screen name="Settings" options={{drawerIcon: ({ color, size }) => {
            return <Icon name="cog" size={size} color={color} />;
          },}} component={Settings} />
     </Drawer.Navigator>
  )
}



export default LecturerDrawer