import { StyleSheet } from 'react-native';
import { appBlue } from '../../../resources/colors/colors';

export const style = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 4,
    },
    headerTextContainer: {
        paddingTop: 10,
        paddingBottom: 10,
    },
    headerText: {
        textAlign: 'center',
        fontFamily: 'Poppins',
        fontWeight: '600',
        fontSize: 20,
    },
    subText: {
        textAlign: 'center',
        fontFamily: 'Poppins',
        fontWeight: '400',
        fontSize: 16,
    },

    direction: {
        flexDirection: 'row',
    },
    card: {
        backgroundColor: appBlue,
        borderRadius: 5,
        marginBottom: 10,
        padding: 10,
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
    timeText: {
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
        paddingTop: 60,
        paddingBottom: 60,
        alignItems: 'center',
        justifyContent: 'center',
    },
    emptyText: {
        fontSize: 12,
        color: 'gray',
        fontFamily: 'Poppins',
    },
    image: {
        width: 150,
        height: 150,
        borderWidth: 0,
    },
    line: {
        borderBottomWidth: 1,
        borderBottomColor: 'lightgray',
        marginVertical: 5,
    },
});
