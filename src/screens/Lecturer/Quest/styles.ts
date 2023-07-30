import { StyleSheet } from 'react-native';
import {
    succesColor,
    warningColor,
    whiteColor,
} from '../../../resources/colors/colors';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
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
    subText: {
        textAlign: 'center',
        fontFamily: 'Poppins',
        fontWeight: '600',
        fontSize: 16,
    },
    line: {
        borderBottomWidth: 1,
        borderBottomColor: 'lightgray',
        marginVertical: 0,
    },
    emptyContainer: {
        flex: 1,
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
    leftAction: {
        flex: 1,
        backgroundColor: succesColor,
        justifyContent: 'center',
        alignContent: 'center',
        paddingLeft: 20,
        alignItems: 'center',
    },
    actionText: {
        color: whiteColor,
        fontFamily: 'Poppins',
    },
    rightAction: {
        alignItems: 'center',
        flex: 1,
        backgroundColor: warningColor,
        justifyContent: 'center',
        paddingRight: 20,
    },
    cardContainer: {
        // Add styles for the card container
        backgroundColor: '#f0f0f0',
        borderRadius: 8,
        padding: 20,
        marginVertical: 10,
        alignItems: 'center',
    },
    cardText: {
        // Add styles for the card text
        fontSize: 18,
        color: '#333',
        fontWeight: 'bold',
    },
    button: {
        width: '80%',
        height: 58,
        borderRadius: 8,
    },
});
