import {
    Dimensions,
    StyleSheet,
    Text,
    View,
    Linking,
    TextInput,
    Pressable,
    Platform,
    TouchableOpacity,
    ScrollView,
    RefreshControl,
} from 'react-native';
import React, { useContext, useState } from 'react';
import { PieChart } from 'react-native-chart-kit';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
    appBlue,
    infoColor,
    warningColor,
    whiteColor,
} from '../../../resources/colors/colors';
import { AuthContext } from '../../../context/AuthContext';
import axios from 'axios';
import { CourseContext } from '../../../context/CourseContext';
import { useQuery } from 'react-query';
import { Link } from 'native-base';
import { LessonContext } from '../../../context/LessonContext';
import DateTimePicker from '@react-native-community/datetimepicker';

interface Analytics {
    Absent: number;
    Present: number;
}

const Analysis = () => {
    const { authorizationKey } = useContext(AuthContext);
    const { IDcourse, courseTitle } = useContext(CourseContext);
    const [loading, setLoading] = useState(false);
    const { idlesson } = useContext(LessonContext);
    const [showPicker, setShowPicker] = useState(false);
    const [date, setDate] = useState(new Date());
    const [dateOfLesson, setDateOfLesson] = useState('');
    const [analysisData, setAnalysisData] = useState({ Present: 0, Absent: 0 });
    const [refreshing, setRefreshing] = useState(false);

    const fetchAnalysis = async () => {
        try {
            const headers = { Authorization: `${authorizationKey}` };
            const formattedDate = formatDate(date);
            const response = await axios.post(
                `https://smart-tag.onrender.com/analytics/${IDcourse}`,
                {
                    currentDateTime: formattedDate,
                },
                { headers }
            );

            setAnalysisData(response.data);

            return response.data;
        } catch (error) {
            console.error('Error fetching analytics:', error);
        } finally {
            // setDateOfLesson('Select a day');
        }
    };

    const fetchLink = async () => {
        try {
            const headers = { Authorization: `${authorizationKey}` };
            const formattedDate = formatDate(date);
            const response = await axios.post(
                `https://smart-tag.onrender.com/attendance/lesson/${IDcourse}`,
                {
                    currentDateTime: formattedDate,
                },
                { headers }
            );

            // Check if 'Link' exists in the response data
            if (response.data && response.data.Link) {
                return response.data.Link;
            } else {
                throw new Error('URL not found in response');
            }
        } catch (error) {
            console.error('Error fetching link:', error);
            return ''; // Return an empty string or an appropriate default value in case of an error
        }
    };

    const handleLinkPress = async () => {
        try {
            setLoading(true); // Set loading to true when fetching starts
            const url = await fetchLink();
            Linking.openURL(url);
        } catch (error) {
            console.error('Error opening link:', error);
        } finally {
            setLoading(false); // Set loading back to false when the fetch is complete (either success or error)
        }
    };

    const onRefresh = async () => {
        setRefreshing(true);
        try {
            // Fetch the analysis data again when the user pulls down to refresh
            await fetchAnalysis();
        } catch (error) {
            console.error('Error fetching analysis:', error);
        } finally {
            setRefreshing(false);
        }
    };

    const screenWidth = Dimensions.get('window').width;
    const chartConfig = {
        backgroundGradientFrom: '#1E2923',
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: '#08130D',
        backgroundGradientToOpacity: 0.5,
        color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: false, // optional
    };
    const content = [
        {
            name: 'Present',
            population: analysisData.Present,
            color: appBlue,
            legendFontColor: '#7F7F7F',
            legendFontSize: 15,
        },
        {
            name: 'Absent',
            population: analysisData.Absent,
            color: warningColor,
            legendFontColor: '#7F7F7F',
            legendFontSize: 15,
        },
    ];

    const toggleDatePicker = () => {
        setShowPicker(!showPicker);
    };

    const onChange = ({ type }: { type: string }, selectedDate: any) => {
        if (type == 'set') {
            const currentDate = selectedDate;
            setDate(currentDate);

            if (Platform.OS === 'android') {
                toggleDatePicker();
                setDateOfLesson(formatDate(currentDate));
                fetchAnalysis();
            }
        } else {
            toggleDatePicker();
        }
    };

    const confirmIOSDate = () => {
        toggleDatePicker();
        setDateOfLesson(date.toDateString());
    };

    const formatDate = (rawDate: Date | string | number) => {
        // Convert rawDate to a Date object if it's not already
        const date = rawDate instanceof Date ? rawDate : new Date(rawDate);

        if (isNaN(date.getTime())) {
            // Invalid date, handle the error here
            return '';
        }

        const year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();

        const formattedMonth = month < 10 ? `0${month}` : month.toString();
        const formattedDay = day < 10 ? `0${day}` : day.toString();

        return `${year}-${formattedMonth}-${formattedDay}`;
    };

    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: whiteColor,
                padding: 5,
            }}
        >
            <View style={styles.headerTextContainer}>
                <Text style={styles.headerText}>Analytics</Text>
            </View>

            <View style={styles.line}></View>
            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            >
                <View style={styles.datePickerContainer}>
                    <Text style={styles.dateText}>Select a day</Text>

                    {showPicker && (
                        <DateTimePicker
                            mode="date"
                            display="spinner"
                            value={date}
                            onChange={onChange}
                            style={styles.datePicker}
                        />
                    )}

                    {showPicker && Platform.OS === 'ios' && (
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-around',
                            }}
                        >
                            <TouchableOpacity
                                style={[styles.button, styles.pickerButton]}
                                onPress={toggleDatePicker}
                            >
                                <Text
                                    style={[
                                        styles.buttonText,
                                        { color: '#075985' },
                                    ]}
                                >
                                    Cancel
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[styles.button, styles.pickerButton]}
                                onPress={confirmIOSDate}
                            >
                                <Text>Confirm</Text>
                            </TouchableOpacity>
                        </View>
                    )}

                    {!showPicker && (
                        <Pressable onPress={toggleDatePicker}>
                            <TextInput
                                style={styles.input}
                                placeholder="Select a day"
                                value={dateOfLesson}
                                onChangeText={setDateOfLesson}
                                editable={false}
                                onPressIn={toggleDatePicker}
                            />
                        </Pressable>
                    )}
                </View>
                <View style={styles.container}>
                    {/* Check if there is data for the pie chart */}
                    {analysisData.Present !== 0 || analysisData.Absent !== 0 ? (
                        // Display the pie chart
                        <PieChart
                            data={content}
                            width={390}
                            height={210}
                            chartConfig={chartConfig}
                            accessor={'population'}
                            backgroundColor={'#f8f0fb'}
                            paddingLeft={'0'}
                            center={[0, 0]}
                            absolute
                            style={{
                                borderRadius: 16,
                            }}
                        />
                    ) : (
                        // Show a message when there is no data for the pie chart
                        <Text style={styles.text}>
                            No data available for the selected day.
                        </Text>
                    )}

                    <View style={{ alignItems: 'center', paddingTop: 25 }}>
                        <Link
                            isExternal
                            _text={{
                                color: 'blue.400',
                            }}
                            onPress={handleLinkPress}
                        >
                            {loading
                                ? 'Loading...'
                                : 'Download Attendance Information'}
                        </Link>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTextContainer: {},
    subTextContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingRight: 10,
        paddingLeft: 5,
    },
    headerText: {
        textAlign: 'center',
        fontFamily: 'Poppins',
        fontWeight: '600',
        fontSize: 20,
    },
    line: {
        borderBottomWidth: 1,
        borderBottomColor: 'lightgray',
        marginVertical: 0,
    },
    text: {
        textAlign: 'center',
        fontFamily: 'Poppins',

        fontSize: 17,
    },
    input: {
        height: 50,
        backgroundColor: 'white',

        paddingHorizontal: 10,
        fontSize: 16,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        width: '100%',
        // textAlign: 'center',
    },
    datePicker: {
        height: 120,
        marginTop: -10,
    },
    pickerButton: {
        paddingHorizontal: 20,
    },
    button: {
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        marginTop: 10,
        marginBottom: 10,
        backgroundColor: infoColor,
    },
    buttonText: {
        fontSize: 14,
        fontWeight: '500',
        color: whiteColor,
    },
    dateText: {
        fontFamily: 'Poppins',
        fontSize: 16,
    },
    datePickerContainer: {
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
    chartContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default Analysis;
