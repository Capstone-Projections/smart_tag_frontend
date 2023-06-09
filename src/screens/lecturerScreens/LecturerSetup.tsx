import React from 'react';
import { Box, Center, Heading, VStack, FormControl, Input, Button, Select, CheckIcon, ArrowBackIcon } from 'native-base';
import { SafeAreaView } from 'react-native-safe-area-context';

interface SetUpScreenProps {
  navigation: any;
}

const LecturerSetUpScreen = (props: SetUpScreenProps) => {
  const handleSetUpPress = () => props.navigation.navigate('TabBar');

  const [service, setService] = React.useState('');
  const [service2, setService2] = React.useState('');

  return (
    <SafeAreaView style={{ padding: 60 }}>
         <Box position="absolute" top={0} left={0} p={3}>
            <Button onPress={() => props.navigation.goBack()} variant="unstyled">
              <ArrowBackIcon size={6} color="coolGray.800" />
            </Button>
          </Box>
      <Center w="100%">
        <Box safeArea p="3" w="90%" maxW="290" py="8">
          <Heading style={{ textAlign: 'center' }} mt="1" color="coolGray.800" _dark={{ color: 'warmGray.200' }} fontWeight="medium" size={'md'}>
            Kindly Setup to get started with Smart Tag
          </Heading>
          {/* Added Back Button */}
         
          <VStack space={3} mt="5">
            <FormControl>
              <FormControl.Label colorScheme="dark">Name</FormControl.Label>
              <Input />
            </FormControl>
            <FormControl>
              <FormControl.Label>Staff Number</FormControl.Label>
              <Input keyboardType="numeric" />
            </FormControl>
            <Box maxW="300">
              <Select
                selectedValue={service}
                minWidth="200"
                accessibilityLabel="Courses"
                placeholder="Courses"
                _selectedItem={{
                  bg: 'teal.600',
                  endIcon: <CheckIcon size="5" />,
                }}
                mt={1}
                onValueChange={itemValue => setService(itemValue)}
              >
                <Select.Item label="1st" value="1st" />
                <Select.Item label="2nd" value="2nd" />
                <Select.Item label="3rd" value="3rd" />
                <Select.Item label="4th" value="4th" />
                <Select.Item label="5th" value="5th" />
                <Select.Item label="6th" value="6th" />
              </Select>
            </Box>
            <Box maxW="300">
              <Select
                selectedValue={service2}
                minWidth="200"
                accessibilityLabel="Course Code"
                placeholder="Course Code"
                _selectedItem={{
                  bg: 'teal.600',
                  endIcon: <CheckIcon size="5" />,
                }}
                mt={1}
                onValueChange={itemValue => setService2(itemValue)}
              >
                <Select.Item label="COE 491" value="COE 491" />
                <Select.Item label="COE 491" value="COE 491" />
              </Select>
            </Box>
            <Button mt="2" colorScheme="darkBlue" onPress={handleSetUpPress}>
              Continue
            </Button>
          </VStack>
        </Box>
      </Center>
    </SafeAreaView>
  );
};

export default LecturerSetUpScreen;
