import { View, Text,StyleSheet,Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { FormControl,Input,Button,Box, VStack,Link } from 'native-base';
import KeyboardAvoidingWrapper from '../../components/KeyboardWrapper';



interface LoginProps{
    navigation: any
  }

const Login = (props: LoginProps) => {
    const handleLoginPress=()=>
    props.navigation.navigate('Drawer')

    const handleLinkPress=()=>
    props.navigation.navigate('GetStarted')

  return (
    <View style={style.container}>
    <KeyboardAvoidingWrapper>
      <SafeAreaView >
          <View >
        <View style={style.imageContainer}>
        <Image source={require('../../../assets/images/login.jpg')} style={style.image} resizeMode='cover'/>
      <Text style={style.title} >Login!</Text>
    </View>
      </View>
        
        <VStack space={2} alignItems="center">
        <FormControl style={style.formControl}>
              <FormControl.Label>
              <Text style={style.labelText}>Email</Text>
              </FormControl.Label>
              <Input style={style.input} _focus={{ borderColor: 'black' }}/>
            </FormControl>
            <Button colorScheme="darkBlue" style={style.button} onPress={handleLoginPress}>Submit for OTP</Button>
            </VStack>
            <View style={{padding:10}}>
                <Link style={style.link} isExternal _text={{
        color: "blue.400"}} onPress={handleLinkPress}>New User?</Link>
            </View>
      </SafeAreaView>
      
    </KeyboardAvoidingWrapper>
    </View>
  )
}

const style = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'white',
      }, 
    title:{
    position: 'absolute',
    top:15,
    left:0,
    fontSize:18,
    fontWeight: 'normal',
    fontFamily: 'Poppins'
},
imageContainer:{
    marginTop:0,
    justifyContent:'center',
    borderRadius: 10,
    margin:10,
    marginBottom:0,
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
    
  },
  labelText: {
    color: 'black', 
    fontFamily: 'Poppins'
  },
  link:{
    flex:1,
    justifyContent:'center',
    paddingLeft:200,
  }
})

export default Login;