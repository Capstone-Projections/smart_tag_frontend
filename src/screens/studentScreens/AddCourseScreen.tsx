import React, { useState, useContext, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'native-base';
import { appBlue } from '../../resources/colors/colors';
import * as Animatable from 'react-native-animatable';
import { SafeAreaView } from 'react-native-safe-area-context';
import RNPickerSelect from 'react-native-picker-select';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { useQuery } from 'react-query';
import { CourseContext } from '../../context/CourseContext';

interface DropdownItem {
    label: string;
    value: string;
}

interface CustomDropdownProps {
    items: DropdownItem[];
    selectedValue: string | undefined;
    onSelect: (value: string) => void;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({
    items,
    selectedValue,
    onSelect,
}) => {
    return (
        <View style={styles.dropdownContainer}>
            <View style={styles.dropdownBox}>
                <RNPickerSelect
                    placeholder={{
                        label: 'Select an item',
                        value: null,
                    }}
                    items={items}
                    onValueChange={onSelect}
                    style={{
                        inputAndroid: {
                            fontSize: 18,
                            paddingHorizontal: 10,
                            paddingVertical: 8,
                            borderWidth: 1,
                            borderColor: 'gray',
                            borderRadius: 8,
                            color: 'black',
                            paddingRight: 30,
                        },
                        inputIOS: {
                            fontSize: 18,
                            paddingVertical: 8,
                            paddingHorizontal: 10,
                            borderWidth: 1,
                            borderColor: 'gray',
                            borderRadius: 8,
                            color: 'black',
                            paddingRight: 30,
                        },
                        iconContainer: {
                            top: 12,
                            right: 10,
                        },
                    }}
                    value={selectedValue}
                />
            </View>
        </View>
    );
};

const AddCourse = () => {
    const [selected, setSelected] = useState<string | undefined>(undefined); // Initialize as undefined
    const [selected2, setSelected2] = useState<string | undefined>(undefined); // Initialize as undefined

    const [data, setData] = useState<DropdownItem[]>([]); // Initialize as empty array
    const [data2, setData2] = useState<DropdownItem[]>([]); // Initialize as empty array

    const { userID, authorizationKey } = useContext(AuthContext);
    const { IDcourse } = useContext(CourseContext);

    const headers = { Authorization: `${authorizationKey}` };

    useEffect(() => {
        // Fetch data for 'data' array
        axios
            .get(
                `https://smart-tag.onrender.com///courses/user/${IDcourse}/${userID}`,
                { headers }
            )
            .then(response => {
                setData(response.data); // Assuming the response data is an array of objects with label and value properties
            })
            .catch(error => {
                console.error(error);
            });

        // Fetch data for 'data2' array
        axios
            .get(
                `https://smart-tag.onrender.com///courses/user/${IDcourse}/${userID}`,
                { headers }
            )
            .then(response => {
                setData2(response.data); // Assuming the response data is an array of objects with label and value properties
            })
            .catch(error => {
                console.error(error);
            });
    }, [headers]);

    const handleCancel = () => {
        setSelected('');
        setSelected2('');
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white', padding: 5 }}>
            <Animatable.View animation="fadeInUp">
                <View>
                    <Text style={styles.headerText}>Add Course</Text>
                </View>
                <View style={styles.line}></View>
                <View style={styles.container}>
                    <View>
                        <Text style={styles.text}>Name</Text>
                        <CustomDropdown
                            items={data}
                            selectedValue={selected}
                            onSelect={value => setSelected(value)}
                        />
                    </View>
                    <View>
                        <Text style={styles.text}>Code</Text>
                        <CustomDropdown
                            items={data2}
                            selectedValue={selected2}
                            onSelect={value => setSelected2(value)}
                        />
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
            </Animatable.View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        alignContent: 'center',
    },
    text: {
        fontFamily: 'Poppins',
        fontSize: 15,
    },
    buttonRow: {
        paddingTop: 20,
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'center',
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
    dropdownContainer: {
        marginVertical: 8,
    },

    dropdownBox: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 8,
        overflow: 'hidden', // This will hide any overflowing content
    },
});

export default AddCourse;
