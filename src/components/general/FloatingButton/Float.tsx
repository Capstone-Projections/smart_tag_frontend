import React, { useRef, useCallback, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Modal,
    TouchableWithoutFeedback,
} from 'react-native';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { appBlue } from '../../../resources/colors/colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface Props {
    navigation: any;
}

const BottomSheetComponent = (props: Props) => {
    const bottomSheetRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    const handleSheetChanges = useCallback((index: number) => {}, []);

    const snapPoints: number[] = [1, 200];

    const toggleBottomSheet = () => {
        setIsVisible(prev => !prev);
    };

    const closeModal = () => {
        setIsVisible(false);
    };

    const handleAddOnPress = () => {
        // Delay the closing of the bottom sheet by a short timeout
        setTimeout(() => {
            toggleBottomSheet();
        }, 10);

        // Trigger the navigation after a short delay
        setTimeout(() => {
            props.navigation.navigate('AddCourse');
        }, 10);
    };

    const handleCreateOnPress = () => {
        // Delay the closing of the bottom sheet by a short timeout
        setTimeout(() => {
            toggleBottomSheet();
        }, 10);

        // Trigger the navigation after a short delay
        setTimeout(() => {
            props.navigation.navigate('CreateCourse');
        }, 10);
    };

    return (
        <>
            <TouchableOpacity
                style={styles.floatingButton}
                onPress={toggleBottomSheet}
            >
                <MaterialCommunityIcons name="plus" size={30} color="white" />
            </TouchableOpacity>
            <Modal
                visible={isVisible}
                transparent={true}
                onRequestClose={closeModal}
            >
                <TouchableWithoutFeedback onPress={closeModal}>
                    <View style={styles.overlay} />
                </TouchableWithoutFeedback>
                <BottomSheet
                    ref={bottomSheetRef}
                    index={isVisible ? 1 : -1}
                    snapPoints={snapPoints}
                    onChange={handleSheetChanges}
                    enablePanDownToClose={true}
                    handleIndicatorStyle={{ backgroundColor: 'transparent' }}
                >
                    <BottomSheetScrollView
                        contentContainerStyle={styles.contentContainer}
                    >
                        <TouchableOpacity
                            style={styles.button}
                            onPress={handleAddOnPress}
                        >
                            <Text style={styles.text}>Add a Course</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={handleCreateOnPress}
                        >
                            <Text style={styles.text}>Create a course</Text>
                        </TouchableOpacity>
                    </BottomSheetScrollView>
                </BottomSheet>
            </Modal>
        </>
    );
};

const styles = StyleSheet.create({
    contentContainer: {
        backgroundColor: '#fff',
        padding: 16,
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        marginBottom: 12,
        backgroundColor: '#f2f2f2',
    },
    text: {
        fontSize: 16,
        fontFamily: 'Poppins',
    },
    floatingButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: appBlue,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 5,
    },
    floatingButtonText: {
        fontSize: 24,
        color: '#fff',
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Adjust the opacity as needed
    },
});

export default BottomSheetComponent;
