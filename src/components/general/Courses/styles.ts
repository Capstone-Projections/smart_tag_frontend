import { StyleSheet } from 'react-native';
import { whiteColor } from '../../../resources/colors/colors';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        // padding: 16,
        // justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        paddingTop: 2,
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
    header: {
        backgroundColor: whiteColor,
        shadowColor: '#333333',
        shadowOffset: { width: -1, height: -3 },
        shadowRadius: 2,
        shadowOpacity: 0.4,
        //
        borderWidth: 0.5,
        borderColor: 'grey',
        paddingTop: 20,
        paddingBottom: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    panelHeader: {
        alignItems: 'center',
    },
    panelHandle: {
        width: 40,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#00000040',
        marginBottom: 10,
    },
    panelTitle: {
        fontSize: 27,
        height: 35,
    },
    panel: {
        padding: 20,
        backgroundColor: '#FFFFFF',
        paddingTop: 20,
        width: '100%',
        height: '100%',
    },
});
