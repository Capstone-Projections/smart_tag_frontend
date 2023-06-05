import React from 'react';
import { Box, Center, Heading, VStack, FormControl, Input, Button,Select,CheckIcon} from 'native-base';


const SetUpScreen = () => {
    const [service, setService] = React.useState("");
    const [service2, setService2] = React.useState("");
    
  return (
    <Center w="100%">
      <Box safeArea p="2" w="90%" maxW="290" py="8">
       <Heading mt="1" color="coolGray.800" _dark={{ color: "warmGray.200" }} fontWeight="medium" size={'md'}>
          Kindly set up to get started with Smart Tag
        </Heading>
        <VStack space={3} mt="5">
          <FormControl>
            <FormControl.Label colorScheme="dark">Name</FormControl.Label>
            <Input />
          </FormControl>
          <FormControl>
            <FormControl.Label >Index Number</FormControl.Label>
            <Input keyboardType='numeric'/>
          </FormControl>
          <Box maxW="300">
        <Select selectedValue={service} minWidth="200" accessibilityLabel="Year" placeholder="Year" _selectedItem={{
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
        <Select selectedValue={service2} minWidth="200" accessibilityLabel="Semester" placeholder="Semester" _selectedItem={{
        bg: "teal.600",
        endIcon: <CheckIcon size="5" />
      }} mt={1} onValueChange={itemValue => setService2(itemValue)}>
          <Select.Item label="1st" value="1st" />
          <Select.Item label="2nd" value="2nd" />
          
        </Select>
      </Box>
          <Button mt="2" colorScheme="blue">
            Continue
          </Button>
        </VStack>
      </Box>
    </Center>
  );
};

export default SetUpScreen;
