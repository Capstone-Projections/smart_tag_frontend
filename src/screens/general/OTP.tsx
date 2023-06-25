import React from "react";
import { useState } from "react";
import { BottomHalf, IconBg, OTPInputContainer, StyledContainer, TextInputHidden, TopHalf } from "./style";
import { View,StyleSheet,Text,Image,TouchableOpacity, ActivityIndicator } from "react-native";
import KeyboardAvoidingWrapper from './../../components/KeyboardWrapper';
import { StatusBar } from "native-base";
import {Octicons} from '@expo/vector-icons'
import CodeInputField from "../../components/general/InputField/CodeInputField";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "native-base";
import { useNavigation } from "@react-navigation/native";


interface OTPVerificatioProps{
    navigation: any,
    route: any
  }


const OTPVerificationScreen=(props:OTPVerificatioProps)=>{

    const [code,setCode]=useState('');
    const[pinReady,setPinReady]=useState(false)
    
//TODO: make sure to use the authenticate route for checking if the otp is right
   //verification button
   const [verifying,setVerifying]=useState(false)

    const MAX_CODE_LENGTH=4
     
    const handleOTPPress = () => {
        const { userType } = props.route.params;
        if (userType === 'student') {
          props.navigation.navigate('SetUp');
        } else if (userType === 'lecturer') {
          props.navigation.navigate('LecturerSetUp');
        }
      };
    
      
    return(
        
        <KeyboardAvoidingWrapper >
            <SafeAreaView >
            <StyledContainer style={{alignItems:'center'}}>
            <TopHalf>
            <Image source={require('../../../assets/images/otpImage.jpg')} style={style.image}/>
            </TopHalf>
            <BottomHalf>
            <Text style={style.text}>Account Verification</Text>
            <Text style={style.infoText}>Enter the 4-digit code sent to your email</Text>

            <CodeInputField
            setPinReady={setPinReady}
            code={code}
            setCode={setCode}
            maxlength={MAX_CODE_LENGTH}
            />     

{!verifying && pinReady && 
(
    <Button colorScheme="darkBlue" style={style.button} onPress={handleOTPPress}>Submit</Button>
)}

{!verifying && !pinReady &&(
     <Button size="sm" isDisabled style={style.button}>
     Submit
   </Button>
)}

{verifying  &&
(
   <ActivityIndicator color={'white'}/>
)}
 
     
            </BottomHalf>
            </StyledContainer>
            </SafeAreaView>
            
        </KeyboardAvoidingWrapper>
       

    )
}

const style=StyleSheet.create({
    image:{
        width:414,
        height: 300,
        borderRadius:10,
        alignItems: 'center',
        margin:0,
    },
    text:{
        fontSize:25,
        textAlign:'center',
        fontWeight:'bold',
        fontFamily:'Poppins',
        padding:10,
    },
    infoText:{
        fontSize:15,
        textAlign:'center',
        fontFamily:'Poppins'
    },
    button:{

        marginTop:20,
        marginLeft:20,
        width: 250,
        height:58,
        borderRadius:8,
        },
}
    )

export default OTPVerificationScreen;