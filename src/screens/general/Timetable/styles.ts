import { StyleSheet } from 'react-native';

export const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingHorizontal: 10,
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
        backgroundColor: '#1D6CA7',
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
});
