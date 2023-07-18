import { View, Text } from 'react-native';
import React, { useContext, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
    FormControl,
    Input,
    VStack,
    Select,
    Box,
    CheckIcon,
    Button,
} from 'native-base';
import KeyboardAvoidingWrapper from '../../../components/general/KeyboardWrapper/KeyboardWrapper';
import { LecturerSetUpScreenProps } from './props';
import { styles } from './styles';
import { AuthContext } from '../../../context/AuthContext';

const LecturerSetUpScreen = (props: LecturerSetUpScreenProps) => {
    const { userType, email, userID, authorizationKey } =
        useContext(AuthContext);
    const [firstName, setFirstName] = useState('');
    const [middleName, setMiddleName] = useState('');
    const [lastName, setLastName] = useState('');
    const [indexNumber, setIndexNUmber] = useState('');
    const [referenceNumber, setReferenceNUmber] = useState('');

    //TODO tie this to the backend
    const handleSetUpPress = async () => {
        props.navigation.navigate('Drawer');
    };

    const [service, setService] = React.useState('');
    const [service2, setService2] = React.useState('');

    return (
        <View style={styles.container}>
            <KeyboardAvoidingWrapper>
                <SafeAreaView>
                    <View style={{ paddingRight: 50 }}>
                        <Text style={styles.header}>
                            Kindly Setup to get started with Smart Tag
                        </Text>
                    </View>

                    <VStack space={4} mt="5">
                        <View>
                            <Text style={styles.text}>Name</Text>
                            <FormControl style={styles.formControl}>
                                <Input
                                    style={styles.input}
                                    _focus={{ borderColor: 'black' }}
                                />
                            </FormControl>
                        </View>
                        <View>
                            <Text style={styles.text}>Staff Number</Text>
                            <FormControl style={styles.formControl}>
                                <Input
                                    style={styles.input}
                                    _focus={{ borderColor: 'black' }}
                                    keyboardType="numeric"
                                />
                            </FormControl>
                        </View>
                        <Box maxW="300">
                            <Text style={styles.text}>Teaching Courses</Text>
                            <Select
                                selectedValue={service}
                                minWidth="200"
                                accessibilityLabel="Year"
                                placeholder="Select Option"
                                _selectedItem={{
                                    bg: 'teal.600',
                                    endIcon: <CheckIcon size="5" />,
                                }}
                                mt={1}
                                onValueChange={itemValue =>
                                    setService(itemValue)
                                }
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
                            <Text style={styles.text}>Course Code</Text>
                            <Select
                                selectedValue={service2}
                                minWidth="200"
                                accessibilityLabel="Course Code"
                                placeholder="Select Option"
                                _selectedItem={{
                                    bg: 'teal.600',
                                    endIcon: <CheckIcon size="5" />,
                                }}
                                mt={1}
                                onValueChange={itemValue =>
                                    setService2(itemValue)
                                }
                            >
                                <Select.Item label="COE 491" value="COE 491" />
                                <Select.Item label="COE 490" value="COE 456" />
                            </Select>
                        </Box>
                        <Button
                            style={styles.button}
                            colorScheme="darkBlue"
                            onPress={handleSetUpPress}
                        >
                            Continue
                        </Button>
                    </VStack>
                </SafeAreaView>
            </KeyboardAvoidingWrapper>
        </View>
    );
};

export default LecturerSetUpScreen;
