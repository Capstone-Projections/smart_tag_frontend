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
        position: 'relative',
    },
    popoverContainer: {
        position: 'absolute', // Make the popover's position absolute
        top: 10, // Adjust the top position to align the popover
        right: 10, // Adjust the right position to align the popover
    },
    title: {
        color: 'white',
        fontFamily: 'Poppins',
    },
    paragraph: {
        color: 'white',
        fontFamily: 'Poppins',
    },
});
