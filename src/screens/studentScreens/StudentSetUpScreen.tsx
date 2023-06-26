import { View, Text,StyleSheet} from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FormControl,Input, VStack,Select,Box,CheckIcon,Button } from 'native-base'
import KeyboardAvoidingWrapper from '../../components/KeyboardWrapper'

interface StudentSetUpScreenProps{
    navigation: any
  }

const StudentSetUpScreen = (props:StudentSetUpScreenProps) => {

    const handleSetUpPress=()=>
    props.navigation.navigate('Drawer')

    const [service, setService] = React.useState("");
    const [service2, setService2] = React.useState("");

  return (
    <View style={style.container} >
        
    <SafeAreaView >
    <View style={{paddingRight:50}}>
      <Text style={style.header}>Kindly Setup to get started with Smart Tag</Text>
      </View>
      
        <VStack space={4} mt="5">
            <View>
        <Text style={style.text}>Name</Text>
        <FormControl style={style.formControl}>
             <Input style={style.input} _focus={{ borderColor: 'black' }}/>
              </FormControl>
              </View>
              <View>
              <Text style={style.text}>Index Number</Text>
        <FormControl style={style.formControl}>
             <Input style={style.input} _focus={{ borderColor: 'black' }} keyboardType='numeric'/>
              </FormControl>
              </View>
              <Box maxW="300">
                <Text style={style.text}>Year</Text>
        <Select selectedValue={service} minWidth="200" accessibilityLabel="Year" placeholder="Select Option" _selectedItem={{
        bg: "teal.600",
        endIcon: <CheckIcon size="5" />
      }} mt={1} onValueChange={itemValue => setService(itemValue)}>
          <Select.Item label="1st" value="1st" />
          <Select.Item label="2nd" value="2nd" />
          <Select.Item label="3rd" value="3rd" />
          <Select.Item label="4th" value="4th" />
          <Select.Item label="5th" value="5th" />
          <Select.Item label="6th" value="6th" />
       
        </Select>
      </Box>
      <Box maxW="300">
        <Text style={style.text}>Semester</Text>
        <Select selectedValue={service2} minWidth="200" accessibilityLabel="Semester" placeholder="Select Option" _selectedItem={{
        bg: "teal.600",
        endIcon: <CheckIcon size="5" />
      }} mt={1} onValueChange={itemValue => setService2(itemValue)}>
          <Select.Item label="1st" value="1st" />
          <Select.Item label="2nd" value="2nd" />
          </Select>
      </Box>
      <Button style={style.button} colorScheme="darkBlue" onPress={handleSetUpPress}>
            Continue
          </Button>
              </VStack>
        
    </SafeAreaView>
    
    </View>
  )
}

const style= StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white',
       alignItems:"center",
       paddingTop:60,
       paddingLeft:40,
          }, 
          formControl: {
            borderColor:'black',
            width: 300,
          },
          input: {
            height: 40, 
            backgroundColor:'white',
            borderColor: 'black', 
            paddingHorizontal: 10, 
            fontSize: 16, 
          },
          header:{
            fontFamily:'Poppins',
            fontSize:20,
            fontWeight:'400',
           textAlign:'center'
          },
          text:{
            fontFamily:'Poppins',
            fontSize:17,
            fontWeight:'400',
           },
           button:{
            width: 300,
            height:58,
            borderRadius:8,
            fontWeight: ''
          },
})

export default StudentSetUpScreen;