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
import React, { useContext, useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import DateTimePicker from '@react-native-community/datetimepicker';
import RNPickerSelect from 'react-native-picker-select';
import DropDownPicker from 'react-native-dropdown-picker';

import { styles } from './style';
import { Button } from 'native-base';
import axios from 'axios';
import { AuthContext } from '../../../context/AuthContext';
import { useQuery } from 'react-query';
import MessageModal from '../../../components/general/modals/MessageModals';
import { MessageTypes } from '../../../components/general/modals/types';
import { useMessageModal } from '../../../hooks/ModalHook';
import { CourseContext } from '../../../context/CourseContext';

interface CustomDropdownProps {
    items: string[];
    selectedValue: string | undefined;
    onSelect: (value: string) => void;
}

interface DropdownItem {
    label: string;
    value: string;
    idlectureRoom: number;
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
                    placeholder={{
                        label: 'Select a lecture room',
                        value: null,
                    }}
                    items={items.map(item => ({
                        label: item.label,
                        value: item.value,
                        idlectureRoom: item.idlectureRoom,
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
                    placeholder={{ label: 'Select a day', value: null }}
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

    const [isDropdownPressed, setIsDropdownPressed] = useState(false);

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
    const { IDcourse } = useContext(CourseContext);
    const [idlesson, setIDlesson] = useState('');

    const { messageModalState, showMessageModal, hideModal, setIsLoading } =
        useMessageModal();

    const handleProceed = () => {
        hideModal();
    };

    const daysList = [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
    ];

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
        setSelectedDay('Select a day');
        setSelectedStartTime(initialStartTime);
        setSelectedEndTime(initialEndTime);
        setSelectedRoom('Select a lecture room');
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
                idlectureRoom: item.idlectureRoom,
            }));

            // console.log(response.data);
            // console.log(responseData);
            return responseData;
        } catch (error) {
            console.error('Error fetching data:', error);
            return [] as DropdownItem[];
        }
    };

    useEffect(() => {
        if (!isDropdownPressed) {
            // Make the API call only when the component mounts for the first time
            fetchRoom().then(data => setRooms(data));
            setIsDropdownPressed(true);
        }
    }, [isDropdownPressed]);

    const formatTime = (date: Date) => {
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    };

    const handleAddLesson = async () => {
        if (
            !selectedDay ||
            !selectedStartTime ||
            !selectedEndTime ||
            !selectedRoom
        ) {
            // Handle case when not all required fields are selected
            return;
        }

        setVerifying(true);
        try {
            const selectedRoomItem = rooms.find(
                item => item.value === selectedRoom
            );

            if (!selectedRoomItem || !selectedRoomItem.idlectureRoom) {
                // Handle the case when the selected room item or its ID is not found
                console.error('Selected room or its ID not found.');
                return;
            }

            const startTimeFormatted = selectedStartTime
                ? formatTime(selectedStartTime)
                : '';
            const endTimeFormatted = selectedEndTime
                ? formatTime(selectedEndTime)
                : '';

            const response = await axios.post(
                `https://smart-tag.onrender.com/lesson/course/${IDcourse}`,
                {
                    day: selectedDay,
                    startTime: startTimeFormatted,
                    endTime: endTimeFormatted,
                    idlectureRoom: selectedRoomItem.idlectureRoom,
                },
                { headers }
            );

            showMessageModal(
                MessageTypes.SUCCESS,
                'Success',
                'Lesson added successfully',
                handleProceed
            );

            // Handle success response
            console.log('Course added successfully:', response.data);
            console.log(response.data.idlesson);
            setIDlesson(response.data.idlesson);
            console.log(idlesson);

            // Link the lesson to the course
            // await linkLesson();

            // Optionally, you can reset the form or navigate to another screen after success
        } catch (error) {
            console.error('Error adding course:', error);
        } finally {
            setVerifying(false);
            setSelectedDay('Select a day');
            setSelectedStartTime(initialStartTime);
            setSelectedEndTime(initialEndTime);
            setSelectedRoom('Select a lecture room');
        }
    };

    const linkLesson = async () => {
        try {
            const headers = { Authorization: `${authorizationKey}` };
            const response = await axios.get(
                `https://smart-tag.onrender.com/lesson/course/${idlesson}/${IDcourse}`,
                { headers }
            );
            return response.data;
        } catch (error) {
            console.error('Error linking lesson and course:', error);
            // Handle the error as needed, such as showing an error message to the user.
            throw error; // Optionally, you can re-throw the error to propagate it to the caller.
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white', padding: 5 }}>
            <View>
                <View>
                    <Text style={styles.headerText}>Edit Lesson</Text>
                </View>
                <View style={styles.line}></View>
                <View>
                    <Text style={styles.text}>
                        Select the day of the lesson:
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
                <View style={styles.timePickerContainer}>
                    {/* Start Time */}
                    <View style={styles.timePicker}>
                        <Text style={styles.text}>Start Time:</Text>
                        <Pressable onPress={toggleStartTimePicker}>
                            <TextInput
                                style={styles.input}
                                placeholder="Select time"
                                editable={false}
                                value={
                                    selectedStartTime
                                        ? selectedStartTime.toLocaleTimeString(
                                              [],
                                              {
                                                  hour: '2-digit',
                                                  minute: '2-digit',
                                                  hour12: false,
                                              }
                                          )
                                        : 'Select time'
                                }
                            />
                        </Pressable>
                        {showStartTimePicker && (
                            <DateTimePicker
                                mode="time"
                                display="spinner"
                                value={selectedStartTime || new Date()}
                                onChange={onStartTimeChange}
                                style={styles.datePicker}
                            />
                        )}
                    </View>

                    {/* End Time */}
                    <View style={styles.timePicker}>
                        <Text style={styles.text}>End Time:</Text>
                        <Pressable onPress={toggleEndTimePicker}>
                            <TextInput
                                style={styles.input}
                                placeholder="Select time"
                                editable={false}
                                value={
                                    selectedEndTime
                                        ? selectedEndTime.toLocaleTimeString(
                                              [],
                                              {
                                                  hour: '2-digit',
                                                  minute: '2-digit',
                                                  hour12: false,
                                              }
                                          )
                                        : 'Select time'
                                }
                            />
                        </Pressable>
                        {showEndTimePicker && (
                            <DateTimePicker
                                mode="time"
                                display="spinner"
                                value={selectedEndTime || new Date()}
                                onChange={onEndTimeChange}
                                style={styles.datePicker}
                            />
                        )}
                    </View>
                </View>

                <View style={styles.buttonRow}>
                    {verifying && (
                        <ActivityIndicator size="large" color={'blue'} />
                    )}
                    {!verifying && (
                        <Button
                            colorScheme="darkBlue"
                            style={styles.button}
                            onPress={handleAddLesson}
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
                <MessageModal
                    messageModalVisible={messageModalState.messageModalVisible}
                    messageType={messageModalState.messageType}
                    headerText={messageModalState.headerText}
                    messageText={messageModalState.messageText}
                    onDismiss={hideModal}
                    onProceed={messageModalState.onProceed}
                />
            </View>
        </SafeAreaView>
    );
};

export default EditLesson;
