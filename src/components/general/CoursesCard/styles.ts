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
        width: '100%',
        marginBottom: 8,
    },
    card: {
        width: '100%',
        height: 130,
        paddingVertical: 10,
        position: 'relative',
        borderRadius: 10,
    },
    popoverContainer: {
        position: 'absolute', // Make the popover's position absolute
        top: 20, // Adjust the top position to align the popover
        right: 10, // Adjust the right position to align the popover
    },
    title: {
        color: 'white',
        fontFamily: 'Poppins',
        // backgroundColor: 'red'
    },
    paragraph: {
        color: 'white',
        fontFamily: 'Poppins',
    },
});
