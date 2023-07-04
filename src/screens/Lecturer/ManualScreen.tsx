import { View, Text, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, FormControl, Input } from 'native-base';
import { appBlue } from '../../resources/colors/colors';
import KeyboardAvoidingWrapper from '../../components/general/KeyboardWrapper/KeyboardWrapper';

const ManualScreen = () => {
    const [name, setName] = useState('');
    const [indexNumber, setIndexNumber] = useState('');

    const handleCancel = () => {
        setName('');
        setIndexNumber('');
    };

    return (
        <KeyboardAvoidingWrapper>
            <SafeAreaView
                style={{ flex: 1, backgroundColor: 'white', padding: 5 }}
            >
                <View>
                    <Text style={styles.headerText}>Add Student</Text>
                </View>
                <View style={styles.line}></View>
                <View style={styles.container}>
                    <View>
                        <Text style={styles.text}>Name</Text>
                        <FormControl style={styles.formControl}>
                            <Input
                                style={styles.input}
                                _focus={{ borderColor: 'black' }}
                                value={name}
                                onChangeText={setName}
                            />
                        </FormControl>
                    </View>
                    <View>
                        <Text style={styles.text}>Index Number</Text>
                        <FormControl style={styles.formControl}>
                            <Input
                                style={styles.input}
                                _focus={{ borderColor: 'black' }}
                                keyboardType="numeric"
                                value={indexNumber}
                                onChangeText={setIndexNumber}
                            />
                        </FormControl>
                    </View>
                    <View style={styles.buttonRow}>
                        <Button colorScheme="darkBlue" style={styles.button}>
                            <Text style={{ color: 'white', fontSize: 18 }}>
                                Add
                            </Text>
                        </Button>

                        <View style={styles.buttonSpace} />

                        <Button
                            colorScheme="darkBlue"
                            style={styles.buttonOutline}
                            variant="outline"
                            onPress={handleCancel}
                        >
                            <Text style={styles.buttonText}>Cancel</Text>
                        </Button>
                    </View>
                </View>
            </SafeAreaView>
        </KeyboardAvoidingWrapper>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    headerText: {
        fontFamily: 'Poppins',
        fontSize: 20,
        fontWeight: '600',
        textAlign: 'center',
    },
    line: {
        borderBottomWidth: 1,
        borderBottomColor: 'lightgray',
        marginVertical: 0,
    },
    formControl: {
        borderColor: 'black',
        width: 300,
    },
    input: {
        height: 50,
        backgroundColor: 'white',
        borderColor: 'black',
        paddingHorizontal: 10,
        fontSize: 16,
    },
    text: {
        fontFamily: 'Poppins',
        fontSize: 17,
        fontWeight: '400',
    },
    buttonRow: {
        paddingTop: 20,
        flexDirection: 'row',
    },
    button: {
        width: 140,
        height: 50,
        borderRadius: 8,
    },
    buttonOutline: {
        width: 140,
        height: 50,
        borderRadius: 8,
        borderColor: appBlue,
    },
    buttonSpace: {
        width: 15,
    },
    buttonText: {
        color: appBlue,
        fontSize: 18,
    },
});

export default ManualScreen;
