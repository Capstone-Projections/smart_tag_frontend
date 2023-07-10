import { StyleSheet } from 'react-native';
import { whiteColor } from '../../../resources/colors/colors';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: whiteColor,
        // justifyContent: 'center',
        alignItems: 'center',
    },
    userInfoSection: {
        paddingHorizontal: 30,
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        marginTop: 15,
        marginBottom: 5,
        fontFamily: 'Poppins-Bold',
    },
    caption: {
        fontSize: 14,
        lineHeight: 16,
        fontFamily: 'Poppins',
    },
    row: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    infoBoxWrapper: {
        borderBottomColor: '#dddddd',
        borderBottomWidth: 1,
        borderTopColor: '#dddddd',
        borderTopWidth: 1,
        flexDirection: 'row',
        height: 100,
    },
    infoBox: {
        width: '50%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    menuWrapper: {
        marginTop: 10,
    },
    menuItem: {
        flexDirection: 'row',
        paddingVertical: 15,
        paddingHorizontal: 30,
    },
    menuItemText: {
        color: '#777777',
        marginLeft: 20,
        fontWeight: '600',
        fontSize: 16,
        lineHeight: 26,
    },
});
