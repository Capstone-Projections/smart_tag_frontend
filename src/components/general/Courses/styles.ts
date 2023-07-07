import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        paddingTop: 10,
        paddingBottom: 0,
        marginBottom: 0,
    },
    headerText: {
        fontSize: 24,
        marginBottom: 16,
        textAlign: 'center',
    },
    cardContainer: {
        marginBottom: 8,
    },
    card: {
        width: 380,
        height: 130,
    },
    title: {
        color: 'white',
    },
    paragraph: {
        color: 'white',
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
