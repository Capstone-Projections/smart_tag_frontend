import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        gap: 20,
    },
    tagContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    tagText: {
        textAlign: 'center',
        fontFamily: 'Poppins',
        fontWeight: '400',
        fontSize: 20,
    },
    imageWrapperWrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerText: {
        textAlign: 'center',
        fontFamily: 'Poppins',
        fontWeight: '600',
        fontSize: 20,
    },
});
