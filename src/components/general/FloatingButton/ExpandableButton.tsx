import {
    Animated,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import React, { useContext, useState } from 'react';
import { appBlue } from '../../../resources/colors/colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import * as XLSX from 'xlsx';
import * as FileSystem from 'expo-file-system';
import { NavigationProp } from '@react-navigation/native';
import { AuthContext } from '../../../context/AuthContext';
import axios, { AxiosResponse } from 'axios';
import { CourseContext } from '../../../context/CourseContext';
import { useMessageModal } from '../../../hooks/ModalHook';
import { MessageTypes } from '../modals/types';
import MessageModal from '../modals/MessageModals';

interface Props {
    navigation: any; // You can use the appropriate type based on your navigation stack
}

interface Item {
    [key: string]: number;
}

function extractIndexNumbers(inputList: Item[]): number[] {
    return inputList.map(item => {
        return Object.values(item)[0];
    });
}

type ApiResponse = {
    message: string;
    'Invalid Users': number[];
    'Already Added': number[];
    // Add other properties if the response has more fields
};

// const arrayOfIndexNumbersForRequest = readFile();
const ExpandableButton = (props: Props) => {
    const { authorizationKey } = useContext(AuthContext);
    const { IDcourse } = useContext(CourseContext);
    const [icon_1] = useState(new Animated.Value(40));
    const [icon_2] = useState(new Animated.Value(40));
    const { messageModalState, showMessageModal, hideModal, setIsLoading } =
        useMessageModal();

    const handleProceed = () => {
        hideModal();
    };

    const handleProceedSuccess = () => {
        // hideModal();
    };

    const [pop, setPop] = useState(false);

    const popIn = () => {
        setPop(true);
        Animated.timing(icon_1, {
            toValue: 140,
            duration: 300,
            useNativeDriver: false,
        }).start();
        Animated.timing(icon_2, {
            toValue: 100,
            duration: 300,
            useNativeDriver: false,
        }).start();
    };

    const popOut = () => {
        setPop(false);
        Animated.timing(icon_1, {
            toValue: 40,
            duration: 300,
            useNativeDriver: false,
        }).start();
        Animated.timing(icon_2, {
            toValue: 40,
            duration: 300,
            useNativeDriver: false,
        }).start();
    };

    const handleIcon2Press = () => {
        props.navigation.navigate('Manual');
    };

    const [content, setContent] = useState<string | null>(null);
    const readFile = async () => {
        try {
            const result = await DocumentPicker.getDocumentAsync({
                type: [
                    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                    'application/vnd.google-apps.spreadsheet',
                ],
            });
            // console.log('File result:', result);

            if (result.assets ? result.assets[0].uri : '') {
                console.log(
                    'File URI:',
                    result.assets ? result.assets[0].uri : ''
                );

                const fileInfo = await FileSystem.getInfoAsync(
                    result.assets ? result.assets[0].uri : ''
                );

                if (fileInfo.exists) {
                    // console.log('File exists:', fileInfo);

                    const fileContent = await FileSystem.readAsStringAsync(
                        result.assets ? result.assets[0].uri : '',
                        {
                            encoding: FileSystem.EncodingType.Base64, // Specify the encoding as Base64
                        }
                    );
                    // console.log('File content:', fileContent);

                    setContent(fileContent);

                    // The rest of the code remains unchanged...
                    // Parse the Excel content using XLSX
                    const workbook = XLSX.read(fileContent, { type: 'base64' });
                    const firstSheetName = workbook.SheetNames[0];
                    const firstSheet = workbook.Sheets[firstSheetName];

                    // Convert sheet data to CSV format
                    const dataFromSheet = XLSX.utils.sheet_to_json(
                        firstSheet
                    ) as Item[];
                    // console.log('Data from sheet:', dataFromSheet);
                    const indexNumbers = extractIndexNumbers(dataFromSheet);
                    // console.log('Index numbers:', indexNumbers);

                    const response = handleUploadPress(indexNumbers);
                    return response;
                } else {
                    // console.log('Selected item is not a valid file.');
                    showMessageModal(
                        MessageTypes.FAIL,
                        'Error',
                        'Selected item is not a valid file.',
                        handleProceed
                    );
                }
            } else {
                // console.log('File picking was canceled or failed.');
                showMessageModal(
                    MessageTypes.FAIL,
                    'Error',
                    'File picking was canceled or failed.',
                    handleProceed
                );
            }
        } catch (err) {
            // console.log('Error picking file:', err);
            // File picking was canceled or failed.
            showMessageModal(
                MessageTypes.FAIL,
                'Error',
                'Error picking file',
                handleProceed
            );
        }
    };

    //create function that will call the readFile and then use the return content to make the query

    const handleUploadPress = async (
        arrayOfIndexNumbersForRequest: number[]
    ) => {
        console.log('input: ', arrayOfIndexNumbersForRequest);
        try {
            const response: AxiosResponse<ApiResponse> = await axios.post(
                `https://smart-tag.onrender.com/courses/user/${IDcourse}`,
                {
                    'Index Numbers': arrayOfIndexNumbersForRequest,
                },
                {
                    headers: { Authorization: authorizationKey },
                }
            );
            // response.data['Invalid Users']
            if (response.status === 200) {
                // console.log(
                //     'message:' + response.data.message,
                //     'Invalid Index Numbers:' + response.data['Invalid Users'],
                //     'Already Added' + response.data['Already Added']
                // );
                if (response.data['Already Added']) {
                    showMessageModal(
                        MessageTypes.INFO,
                        'Already Added',
                        `${
                            response.data['Already Added'].length +
                            'students were added already'
                        }`,
                        handleProceed
                    );
                }
                if (response.data['Invalid Users'].length > 0) {
                    showMessageModal(
                        MessageTypes.INFO,
                        'Invalid Index Numbers',
                        response.data['Invalid Users'].toString(),
                        handleProceed
                    );
                } else {
                    showMessageModal(
                        MessageTypes.SUCCESS,
                        'Success',
                        'Students Added',
                        handleProceed
                    );
                }
            }
        } catch (error) {
            console.log('Error:', error);
        }
    };

    return (
        <View style={{ flex: 1 }}>
            <Animated.View style={[styles.floatingButton, { bottom: icon_1 }]}>
                <TouchableOpacity onPress={readFile}>
                    <MaterialCommunityIcons
                        name="cloud-upload"
                        size={30}
                        color="white"
                    />
                </TouchableOpacity>
            </Animated.View>
            <Animated.View
                style={[
                    styles.floatingButton,
                    { right: icon_2, bottom: icon_2 },
                ]}
            >
                <TouchableOpacity onPress={handleIcon2Press}>
                    <MaterialCommunityIcons
                        name="check"
                        size={30}
                        color="white"
                    />
                </TouchableOpacity>
            </Animated.View>
            <TouchableOpacity
                onPress={() => {
                    pop === false ? popIn() : popOut();
                }}
                style={styles.floatingButton}
            >
                <MaterialCommunityIcons name="plus" size={30} color="white" />
            </TouchableOpacity>
            <MessageModal
                messageModalVisible={messageModalState.messageModalVisible}
                messageType={messageModalState.messageType}
                headerText={messageModalState.headerText}
                messageText={messageModalState.messageText}
                onDismiss={hideModal}
                onProceed={messageModalState.onProceed}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    floatingButton: {
        position: 'absolute',
        bottom: 40,
        right: 40,
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: appBlue,
        alignItems: 'center',
        justifyContent: 'center',
        // elevation: 5,
    },
    floatingButton2: {
        position: 'absolute',
        bottom: 70,
        right: 20,
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: appBlue,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 5,
    },
});

export default ExpandableButton;
