import {
    StyleSheet,
    Text,
    TextInput,
    View,
    Pressable,
    Platform,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native';
import React, { useContext, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import DateTimePicker from '@react-native-community/datetimepicker';
import RNPickerSelect from 'react-native-picker-select';

import { styles } from './style';
import { Button } from 'native-base';
import axios from 'axios';
import { AuthContext } from '../../../context/AuthContext';
import { useQuery } from 'react-query';

interface CustomDropdownProps {
    items: string[];
    selectedValue: string | undefined;
    onSelect: (value: string) => void;
}

interface DropdownItem {
    label: string;
    value: string;
    idcourse: number;
}

interface CustomDropdownProps2 {
    items: DropdownItem[];
    selectedValue: string | undefined;
    onSelect: (value: string) => void;
}

const CustomDropdown2: React.FC<CustomDropdownProps2> = ({
    items,
    selectedValue,
    onSelect,
}) => {
    return (
        <View style={styles.dropdownContainer}>
            <View style={styles.dropdownBox}>
                <RNPickerSelect
                    placeholder={{ label: 'Select an item', value: null }}
                    items={items.map(item => ({
                        label: item.label,
                        value: item.value,
                    }))}
                    onValueChange={onSelect}
                    value={selectedValue}
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
                />
            </View>
        </View>
    );
};

const CustomDropdown: React.FC<CustomDropdownProps> = ({
    items,
    selectedValue,
    onSelect,
}) => {
    return (
        <View style={styles.dropdownContainer}>
            <View style={styles.dropdownBox}>
                <RNPickerSelect
                    placeholder={{ label: 'Select an item', value: null }}
                    items={items.map(item => ({
                        label: item,
                        value: item,
                    }))}
                    onValueChange={onSelect}
                    value={selectedValue}
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
                />
            </View>
        </View>
    );
};

const EditLesson = () => {
    const initialStartTime = null;
    const initialEndTime = null;

    const [selectedRoom, setSelectedRoom] = useState<string | undefined>(
        undefined
    ); // Initialize as undefined

    const [rooms, setRooms] = useState<DropdownItem[]>([]);

    const [selectedDay, setSelectedDay] = useState<string | undefined>(
        undefined
    );
    const [showStartTimePicker, setShowStartTimePicker] = useState(false);
    const [showEndTimePicker, setShowEndTimePicker] = useState(false);
    const [selectedStartTime, setSelectedStartTime] = useState<Date | null>(
        initialStartTime
    );
    const [selectedEndTime, setSelectedEndTime] = useState<Date | null>(
        initialEndTime
    );
    const [verifying, setVerifying] = useState(false);
    const { userID, authorizationKey } = useContext(AuthContext);

    const daysList = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

    const toggleStartTimePicker = () => {
        setShowStartTimePicker(!showStartTimePicker);
    };

    const toggleEndTimePicker = () => {
        setShowEndTimePicker(!showEndTimePicker);
    };

    const onStartTimeChange = (event: any, selected?: Date) => {
        if (Platform.OS === 'android') {
            toggleStartTimePicker();
        }
        if (selected !== undefined) {
            setSelectedStartTime(selected);
        }
    };

    const onEndTimeChange = (event: any, selected?: Date) => {
        if (Platform.OS === 'android') {
            toggleEndTimePicker();
        }
        if (selected !== undefined) {
            setSelectedEndTime(selected);
        }
    };

    const handleCancel = () => {
        setSelectedDay('Select an item');
        setSelectedStartTime(initialStartTime);
        setSelectedEndTime(initialEndTime);
        setSelectedRoom('Select an item');
    };

    const headers = { Authorization: `${authorizationKey}` };

    const fetchRoom = async () => {
        try {
            const response = await axios.get(
                `https://smart-tag.onrender.com/lectureroom`,
                { headers }
            );

            const responseData = response.data.map((item: any) => ({
                label: item.name,
                value: item.name,
                idcourse: item.idcourse,
            }));

            // console.log(response.data);
            // console.log(responseData);
            return responseData;
        } catch (error) {
            console.error('Error fetching data:', error);
            return [] as DropdownItem[];
        }
    };

    useQuery<DropdownItem[], Error>('listRoom', fetchRoom, {
        enabled: !!authorizationKey,
        onSuccess: data => setRooms(data),
    });

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white', padding: 5 }}>
            <View>
                <View>
                    <Text style={styles.headerText}>Edit Lesson</Text>
                </View>
                <View style={styles.line}></View>
                <View>
                    <Text style={styles.text}>
                        Selected the day of the lesson:
                    </Text>
                    <CustomDropdown
                        items={daysList}
                        selectedValue={selectedDay}
                        onSelect={value => setSelectedDay(value)}
                    />
                </View>
                <View>
                    <Text style={styles.text}>Lecturer Room:</Text>
                    <CustomDropdown2
                        items={rooms}
                        selectedValue={selectedRoom}
                        onSelect={value => setSelectedRoom(value)}
                    />
                </View>
                <View>
                    <Text style={styles.text}>Start Time:</Text>
                    <Pressable onPress={toggleStartTimePicker}>
                        <TextInput
                            style={styles.input}
                            placeholder="Select time"
                            editable={false}
                            value={
                                selectedStartTime
                                    ? selectedStartTime.toLocaleTimeString([], {
                                          hour: '2-digit',
                                          minute: '2-digit',
                                          hour12: false,
                                      })
                                    : 'Select time' // Display placeholder when no time is selected
                            }
                        />
                    </Pressable>
                </View>
                {showStartTimePicker && (
                    <DateTimePicker
                        mode="time"
                        display="spinner"
                        value={selectedStartTime || new Date()}
                        onChange={onStartTimeChange}
                        style={styles.datePicker}
                    />
                )}
                <View>
                    <Text style={styles.text}>End Time:</Text>
                    <Pressable onPress={toggleEndTimePicker}>
                        <TextInput
                            style={styles.input}
                            placeholder="Select time"
                            editable={false}
                            value={
                                selectedEndTime
                                    ? selectedEndTime.toLocaleTimeString([], {
                                          hour: '2-digit',
                                          minute: '2-digit',
                                          hour12: false,
                                      })
                                    : 'Select time' // Display placeholder when no time is selected
                            }
                        />
                    </Pressable>
                </View>
                {showEndTimePicker && (
                    <DateTimePicker
                        mode="time"
                        display="spinner"
                        value={selectedEndTime || new Date()}
                        onChange={onEndTimeChange}
                        style={styles.datePicker}
                    />
                )}

                <View style={styles.buttonRow}>
                    {verifying && (
                        <ActivityIndicator size="large" color={'blue'} />
                    )}
                    {!verifying && (
                        <Button
                            colorScheme="darkBlue"
                            style={styles.button}
                            // onPress={handleAddCourse}
                        >
                            <Text style={{ color: 'white', fontSize: 18 }}>
                                Add
                            </Text>
                        </Button>
                    )}

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
    );
};

export default EditLesson;
