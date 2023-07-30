import React, { useState, useContext, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { Button } from 'native-base';
import { appBlue } from '../../../resources/colors/colors';
import * as Animatable from 'react-native-animatable';
import { SafeAreaView } from 'react-native-safe-area-context';
import RNPickerSelect from 'react-native-picker-select';
import axios from 'axios';
import { AuthContext } from '../../../context/AuthContext';
import { useQuery } from 'react-query';
import { styles } from './style';
import MessageModal from '../../../components/general/modals/MessageModals';
import { MessageTypes } from '../../../components/general/modals/types';
import { useMessageModal } from '../../../hooks/ModalHook';

interface DropdownItem {
    label: string;
    value: string;
    idcourse: number;
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
                        label: 'Select a course',
                        value: null,
                    }}
                    items={items.map(item => ({
                        label: item.label,
                        value: item.value,
                    }))}
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

    const [coursesList, setCoursesList] = useState<DropdownItem[]>([]);

    const { userID, authorizationKey } = useContext(AuthContext);

    const [verifying, setVerifying] = useState(false);

    const headers = { Authorization: `${authorizationKey}` };

    const { messageModalState, showMessageModal, hideModal, setIsLoading } =
        useMessageModal();

    const handleProceed = () => {
        hideModal();
    };

    const fetchList = async () => {
        try {
            const response = await axios.get(
                `https://smart-tag.onrender.com/courses`,
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

    useQuery<DropdownItem[], Error>('courseListDropDown', fetchList, {
        enabled: !!authorizationKey,
        onSuccess: data => setCoursesList(data),
    });

    const handleCancel = () => {
        setSelected('Select a course');
        // setSelected2('');
    };

    const handleAddCourse = async () => {
        if (selected) {
            try {
                setVerifying(true);

                const courseID = coursesList.find(
                    course => course.label === selected
                )?.idcourse;
                // Use the courseID for something entirely different
                // console.log('Selected Course ID:', courseID);

                const response = await axios.get(
                    `https://smart-tag.onrender.com/courses/user/${courseID}/${userID}`,
                    { headers }
                );

                showMessageModal(
                    MessageTypes.SUCCESS,
                    'Success',
                    'Course added successfully',
                    handleProceed
                );

                if (response.data.code === 'P2002') {
                    showMessageModal(
                        MessageTypes.INFO,
                        'Info',
                        response.data.message,
                        handleProceed
                    );
                }
                // console.log('Course added successfully:', response.data);
            } catch (error: any) {
                if (error) {
                    showMessageModal(
                        MessageTypes.FAIL,
                        'Error',
                        'Failed to add course.Try Again',
                        handleProceed
                    );
                }
                console.error('Error adding course:', error);
            } finally {
                setVerifying(false);
                setSelected('Select an item');
            }
        } else {
            showMessageModal(
                MessageTypes.INFO,
                'Info',
                'Select A course First',
                handleProceed
            );
        }
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
                        <Text style={styles.text}>
                            Select the name of the course in the dropdown below
                            to be enrolled
                        </Text>
                        <CustomDropdown
                            items={coursesList}
                            selectedValue={selected}
                            onSelect={value => setSelected(value)}
                        />
                    </View>

                    <View style={styles.buttonRow}>
                        <Button
                            colorScheme="darkBlue"
                            style={styles.button}
                            onPress={handleAddCourse}
                        >
                            {verifying ? (
                                <ActivityIndicator size="large" color="white" />
                            ) : (
                                <Text style={{ color: 'white', fontSize: 18 }}>
                                    Add
                                </Text>
                            )}
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
                <MessageModal
                    messageModalVisible={messageModalState.messageModalVisible}
                    messageType={messageModalState.messageType}
                    headerText={messageModalState.headerText}
                    messageText={messageModalState.messageText}
                    onDismiss={hideModal}
                    onProceed={messageModalState.onProceed}
                />
            </Animatable.View>
        </SafeAreaView>
    );
};

export default AddCourse;
