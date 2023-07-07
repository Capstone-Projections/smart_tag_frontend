import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 4,
    },
    headerTextContainer: {
        paddingTop: 10,
        paddingBottom: 10,
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
        textAlign: 'left',
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
});
