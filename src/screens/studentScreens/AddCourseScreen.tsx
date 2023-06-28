import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { SelectList } from 'react-native-dropdown-select-list';
import { Button } from 'native-base';
import { styled } from 'styled-components/native';

const AddCourse = () => {
    const [selected, setSelected] = React.useState('');
    const [selected2, setSelected2] = React.useState('');

    const data = [
        { key: '1', value: 'Mobiles' },
        { key: '2', value: 'Appliances' },
        { key: '3', value: 'Cameras' },
        { key: '4', value: 'Computers' },
        { key: '5', value: 'Vegetables' },
        { key: '6', value: 'Diary Products' },
        { key: '7', value: 'Drinks' },
    ];

    const data2 = [
        { key: '1', value: 'Mobiles' },
        { key: '2', value: 'Appliances' },
        { key: '3', value: 'Cameras' },
        { key: '4', value: 'Computers' },
        { key: '5', value: 'Vegetables' },
        { key: '6', value: 'Diary Products' },
        { key: '7', value: 'Drinks' },
    ];

    return (
        <View style={style.container}>
            <View>
                <Text style={style.text}>Name</Text>
                <SelectList
                    data={data}
                    setSelected={setSelected}
                    save="value"
                    inputStyles={{ fontFamily: 'Poppins' }}
                    boxStyles={{ width: 300 }}
                />
            </View>
            <View>
                <Text style={style.text}>Code</Text>
                <SelectList
                    data={data2}
                    setSelected={setSelected2}
                    save="value"
                    inputStyles={{ fontFamily: 'Poppins' }}
                    boxStyles={{ width: 300 }}
                />
            </View>

            <View style={style.buttonRow}>
                <Button colorScheme="darkBlue" style={style.button}>
                    <Text style={{ color: 'white', fontSize: 18 }}>Add</Text>
                </Button>

                <View style={style.buttonSpace} />

                <Button
                    colorScheme="darkBlue"
                    style={style.buttonOutline}
                    variant="outline"
                >
                    <Text style={style.buttonText}>Cancel</Text>
                </Button>
            </View>
        </View>
    );
};

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        paddingLeft: 10,
    },
    text: {
        fontFamily: 'Poppins',
        fontSize: 18,
        fontWeight: '600',
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
        borderColor: '#196B9A',
    },
    buttonSpace: {
        width: 15,
    },
    buttonText: {
        color: '#196B9A',
        fontSize: 18,
    },
});

export default AddCourse;
