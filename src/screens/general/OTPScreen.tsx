import React from "react";
import { useState } from "react";
import { BottomHalf, OTPInputContainer, StyledContainer, TextInputHidden, TopHalf } from "./style";
import { StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import CodeInputField from "../../components/general/InputField/CodeInputField";
import { Button, NativeBaseProvider,Center,Text } from "native-base";



const OTPScreen = () => {
    const [code,setCode]=useState('');
    const[pinReady,setPinReady]=useState('false')

    const MAX_CODE_LENGTH=4

 return (
    <StyledContainer>
    <View style={styles.container}>
   <OTPInputContainer style={{alignItems: 'center'}}/>
   
     <CodeInputField
     setPinReady={setPinReady}
     code={code}
     setCode={setCode}
     maxlength={MAX_CODE_LENGTH}
     />        
    
   </View>
   </StyledContainer>
 );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "white",
      alignItems: "center",
      justifyContent: "center",
      
      
    },
   });

export default OTPScreen;