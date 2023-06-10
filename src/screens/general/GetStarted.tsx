import { View, Text,StyleSheet,Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { FormControl,Input,Button,Box, VStack } from 'native-base';
import { styled } from 'styled-components/native';
import KeyboardAvoidingWrapper from '../../components/KeyboardWrapper';



interface GetStartedProps{
    navigation: any
  }

const GetStarted = (props: GetStartedProps) => {
    const handleGetStartedPress=()=>
    props.navigation.navigate('TabBar')

  return (
    <KeyboardAvoidingWrapper>
    <SafeAreaView >
          <View >
        <View style={style.imageContainer}>
        <Image source={require('../../../assets/images/pexels-cottonbro-studio-3661193.jpg')} style={style.image} resizeMode='cover'/>
      <Text style={style.title} >Get Started!</Text>
    </View>
      </View>
        
        <VStack space={2} alignItems="center">
        <FormControl style={style.formControl}>
              <FormControl.Label>
              <Text style={style.labelText}>Email</Text>
              </FormControl.Label>
              <Input style={style.input} _focus={{ borderColor: 'black' }}/>
            </FormControl>
            <Button colorScheme="darkBlue" style={style.button} onPress={handleGetStartedPress}>Submit for OTP</Button>
            </VStack>
      </SafeAreaView>
    </KeyboardAvoidingWrapper>
  )
}

const style = StyleSheet.create({ 
    title:{
    position: 'absolute',
    top:0,
    left:0,
    fontSize:28,
    fontWeight: 'normal',
    fontFamily: 'Poppins'


},
imageContainer:{
    marginTop:0,
    justifyContent:'center',
    borderRadius: 10,
    margin:10,
    alignItems: 'center',    
},
image:{
    width:400,
    height: 450,
    borderRadius:10,
    alignItems: 'center',
},
formControl: {
    borderColor:'black',
    width: '80%',
  },
  input: {
    height: 40, 
    backgroundColor:'white',
   
    borderColor: 'black', 
    paddingHorizontal: 10, 
    fontSize: 16, 
  },
  button:{
    width: 300,
    height:58,
    borderRadius:8,
    fontWeight: ''
  },
  labelText: {
    color: 'black', 
  },
})

export default GetStarted;