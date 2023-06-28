import { View, Text, StyleSheet } from 'react-native';
import React, { useState } from 'react';
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
import KeyboardAvoidingWrapper from '../../components/KeyboardWrapper';
import axios from 'axios';

interface StudentSetUpScreenProps {
    navigation: any;
    route: any;
}

const StudentSetUpScreen = (props: StudentSetUpScreenProps) => {
    const [firstName, setFirstName] = useState('');
    const [middleName, setMiddleName] = useState('');
    const [lastName, setLastName] = useState('');
    const [indexNumber, setIndexNUmber] = useState('');
    const [referenceNumber, setReferenceNUmber] = useState('');

    const handleSetUpPress = async () => {
        const { userType, email, userID } = props.route.params;
        console.log(userID);
        console.log(userType);

        await axios
            .put(`https://smart-tag.onrender.com/users/${userID}}`, {
                email: email,
                firstName: firstName,
                middleName: middleName,
                lastName: lastName,
                indexNumber: indexNumber,
                referenceNumber: referenceNumber,
                role: userType.toUpperCase(),
            })
            .then(response => {
                // handle success
                console.log(response.data);
            })
            .catch(error => {
                // handle error
                console.error(error);
            });
        props.navigation.navigate('Drawer');
    };

    return (
        <View style={style.container}>
            <SafeAreaView>
                <View style={{ paddingRight: 50 }}>
                    <Text style={style.header}>
                        Kindly Setup to get started with Smart Tag
                    </Text>
                </View>

                <VStack space={4} mt="5">
                    <View>
                        <Text style={style.text}>First Name</Text>
                        <FormControl style={style.formControl}>
                            <Input
                                style={style.input}
                                _focus={{ borderColor: 'black' }}
                                value={firstName}
                                onChangeText={setFirstName}
                            />
                        </FormControl>
                    </View>
                    <View>
                        <Text style={style.text}>Middle Name</Text>
                        <FormControl style={style.formControl}>
                            <Input
                                style={style.input}
                                _focus={{ borderColor: 'black' }}
                                value={middleName}
                                onChangeText={setMiddleName}
                            />
                        </FormControl>
                    </View>
                    <View>
                        <Text style={style.text}>Last Name</Text>
                        <FormControl style={style.formControl}>
                            <Input
                                style={style.input}
                                _focus={{ borderColor: 'black' }}
                                value={lastName}
                                onChangeText={setLastName}
                            />
                        </FormControl>
                    </View>
                    <View>
                        <Text style={style.text}>Index Number</Text>
                        <FormControl style={style.formControl}>
                            <Input
                                style={style.input}
                                _focus={{ borderColor: 'black' }}
                                keyboardType="numeric"
                                value={indexNumber}
                                onChangeText={setIndexNUmber}
                            />
                        </FormControl>
                    </View>
                    <View>
                        <Text style={style.text}>Reference Number</Text>
                        <FormControl style={style.formControl}>
                            <Input
                                style={style.input}
                                _focus={{ borderColor: 'black' }}
                                keyboardType="numeric"
                                value={referenceNumber}
                                onChangeText={setReferenceNUmber}
                            />
                        </FormControl>
                    </View>
                    <Button
                        style={style.button}
                        colorScheme="darkBlue"
                        onPress={handleSetUpPress}
                    >
                        Continue
                    </Button>
                </VStack>
            </SafeAreaView>
        </View>
    );
};

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        paddingTop: 60,
        paddingLeft: 50,
        verticalAlign: 0,
    },
    formControl: {
        borderColor: 'black',
        width: 300,
    },
    input: {
        height: 40,
        backgroundColor: 'white',
        borderColor: 'black',
        paddingHorizontal: 10,
        fontSize: 16,
    },
    header: {
        fontFamily: 'Poppins',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    text: {
        fontFamily: 'Poppins',
        fontSize: 14,
        fontWeight: '400',
    },
    button: {
        width: 300,
        height: 58,
        borderRadius: 8,
        fontWeight: '',
    },
});

export default StudentSetUpScreen;
