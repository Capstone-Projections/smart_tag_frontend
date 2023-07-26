import { Dimensions, StyleSheet, Text, View, Linking } from 'react-native';
import React, { useContext } from 'react';
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart,
} from 'react-native-chart-kit';
import { Svg } from 'react-native-svg';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
    appBlue,
    warningColor,
    whiteColor,
} from '../../../resources/colors/colors';
import { AuthContext } from '../../../context/AuthContext';
import axios from 'axios';
import { CourseContext } from '../../../context/CourseContext';
import { useQuery } from 'react-query';
import { Link } from 'native-base';

interface Analytics {
    Absent: number;
    Present: number;
}

const Analysis = () => {
    const { userID, authorizationKey } = useContext(AuthContext);
    const { IDcourse, courseTitle } = useContext(CourseContext);
    //TODO: remove the hard code to one and then change it to something that you can get
    const fetchAnalysis = async () => {
        const headers = { Authorization: `${authorizationKey}` };
        const response = await axios.get(
            `https://smart-tag.onrender.com/analytics/1/${IDcourse}`,
            { headers }
        );
        return response.data;
    };

    const { data: results = {} } = useQuery<Analytics>(
        'Analytics',
        fetchAnalysis
    );
    //@ts-ignore

    // console.log(results.Absent);
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
            //@ts-ignore
            population: results.Present,
            color: appBlue,
            legendFontColor: '#7F7F7F',
            legendFontSize: 15,
        },
        {
            name: 'Absent',
            //@ts-ignore
            population: results.Absent,
            color: warningColor,
            legendFontColor: '#7F7F7F',
            legendFontSize: 15,
        },
    ];
    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: whiteColor,
                padding: 5,
            }}
        >
            <View style={styles.headerTextContainer}>
                <Text style={styles.headerText}>{courseTitle} </Text>
            </View>

            <View style={styles.line}></View>
            <View style={styles.container}>
                <PieChart
                    data={content}
                    width={screenWidth}
                    height={210}
                    chartConfig={chartConfig}
                    accessor={'population'}
                    backgroundColor={'transparent'}
                    paddingLeft={'15'}
                    center={[10, 20]}
                    absolute
                />
                <View style={{ alignItems: 'center' }}>
                    <Link>Download Attendance Information</Link>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        justifyContent: 'center',

        // paddingTop: 4,
    },
    headerTextContainer: {
        // paddingTop: 4,
        // paddingBottom: 4,
    },
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
});

export default Analysis;
