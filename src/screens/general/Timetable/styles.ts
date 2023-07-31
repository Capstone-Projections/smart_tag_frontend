import { StyleSheet } from 'react-native';
import { appBlue } from '../../../resources/colors/colors';

export const style = StyleSheet.create({
    container: {
        flex: 1,
        padding: 4,
    },
    headerTextContainer: {
        // paddingTop: 4,
        // paddingBottom: 4,
    },
    headerText: {
        textAlign: 'center',
        fontFamily: 'Poppins',
        fontWeight: '600',
        fontSize: 20,
    },
    subText: {
        textAlign: 'left',
        fontFamily: 'Poppins',
        fontWeight: '400',
        fontSize: 17,
    },
    subTextContainer: {
        flexDirection: 'row',
        // paddingTop: 10,
        justifyContent: 'space-between',
        paddingRight: 10,
        paddingLeft: 5,
    },

    direction: {
        flexDirection: 'row',
    },
    card: {
        paddingVertical: 5,
        flexDirection: 'column',
        gap: 10,
        width: '100%',
        //   backgroundColor: 'red'
    },

    cardWrapper: {
        width: '100%',
        gap: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 50,
    },

    dayColumn: {
        flex: 1,
        marginRight: 0,
    },
    timeColumn: {
        flex: 2,
        marginLeft: 5,
    },
    dayText: {
        fontSize: 16,
        textAlign: 'center',
        color: 'white',
        fontFamily: 'Poppins',
    },

    day: {
        backgroundColor: appBlue,
        width: 120,
        padding: 2,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
    },

    time: {
        backgroundColor: appBlue,
        paddingLeft: 20,
        flex: 1,
        padding: 2,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 5,
    },

    timeText: {
        flex: 1,
        fontSize: 16,
        textAlign: 'center',
        color: 'white',
        fontFamily: 'Poppins',
    },
    link: {
        justifyContent: 'center',
        fontFamily: 'Poppins',
    },
    emptyContainer: {
        paddingTop: 200,
        paddingBottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    emptyText: {
        fontSize: 12,
        color: 'gray',
        fontFamily: 'Poppins',
    },
    image: {
        width: 200,
        height: 200,
    },
    line: {
        borderBottomWidth: 1,
        borderBottomColor: 'lightgray',
        marginVertical: 5,
    },
});
