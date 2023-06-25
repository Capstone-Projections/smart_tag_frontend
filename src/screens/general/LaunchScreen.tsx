import { View, Text,StyleSheet,Image } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Button, VStack } from 'native-base'
import * as Animatable from 'react-native-animatable';

interface LaunchScreenProps{
  navigation:any;
}

const LaunchScreen = (props:LaunchScreenProps) => {
  const handleStudentPress=()=>
    props.navigation.navigate('Login',{ userType: 'student' })

  const handleTeacherPress=()=>
   props.navigation.navigate('Login',{ userType: 'lecturer' })

  return (
    <View style={style.container}>
    <SafeAreaView >
      <View style={style.imageContainer}>
        < Animatable.Image animation='fadeInDown' source={require('../../../assets/images/launch.jpg')} style={style.image}/>
      </View>
      <Animatable.View animation='fadeInDown' style={{padding:10}}>
        <Text style={style.textFirst}>Welcome!</Text>
        <Text style={style.textSecond}>Are you a student or lecturer?</Text>
      </Animatable.View>
      <Animatable.View animation='fadeInDown'>
      <VStack space={5} alignItems="center">
      <Button colorScheme="darkBlue" style={style.button} onPress={handleStudentPress}>Student</Button>
      <Button colorScheme="darkBlue" style={style.button}  onPress={handleTeacherPress} >Lecturer</Button>
      </VStack>
      </Animatable.View>
    </SafeAreaView>
    </View>
  )
}


const style = StyleSheet.create({
  container:{
flex:1,
backgroundColor:'white',
  },
    imageContainer:{
        marginTop:0,
        justifyContent:'center',
        borderRadius: 10,
        margin:10,
        alignItems: 'center', 
         
    },
    image:{
        width:414,
        height: 450,
        borderRadius:10,
        alignItems: 'center',
        margin:0,
    },
    textFirst:{
        fontSize:28,
        textAlign: 'center', 
        fontFamily: 'Poppins'
    },
    textSecond:{
        fontSize:21,
       fontWeight: '300',
       textAlign: 'center', 
       fontFamily: 'Poppins'
       
    },
    button:{
        width: 300,
        height:58,
        borderRadius:8,
    },

})

export default LaunchScreen