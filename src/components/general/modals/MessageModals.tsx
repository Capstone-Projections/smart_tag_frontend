import {
    Modal,
    Pressable,
    View,
    StyleSheet,
    Text,
    ActivityIndicator,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Button, Icon } from 'native-base';
import {
    appBlue,
    failColor,
    succesColor,
    infoColor,
    dangerousDecisionColor,
    warningColor,
    decisionColor,
    whiteColor,
} from '../../../resources/colors/colors';
import {
    MessageTypes,
    MessageThemeColorType,
    MessageIconNameType,
    MessageModalProps,
} from './types';

const MessageModal = ({
    messageModalVisible,
    messageType,
    headerText,
    messageText,
    onDismiss,
    onProceed,
    onReject,
    isLoading,
}: MessageModalProps) => {
    let messageIconName: MessageIconNameType,
        messageThemeColor: MessageThemeColorType = '';

    switch (messageType) {
        case MessageTypes.FAIL:
            messageIconName = 'close';
            messageThemeColor = failColor;
            break;

        case MessageTypes.SUCCESS:
            messageIconName = 'check';
            messageThemeColor = succesColor;
            break;

        case MessageTypes.WARNING:
            messageIconName = 'alert-circle-outline';
            messageThemeColor = warningColor;
            break;

        case MessageTypes.DECISION:
            messageIconName = 'alert-circle-check-outline';
            messageThemeColor = decisionColor;
            break;

        case MessageTypes.DANGEROUS_DECISION:
            messageIconName = 'alert-circle-check-outline';
            messageThemeColor = dangerousDecisionColor;
            break;

        default:
            messageIconName = 'information-variant';
            messageThemeColor = infoColor;
            break;
    }

    return (
        <Modal
            animationType="fade"
            visible={messageModalVisible}
            transparent={true}
        >
            <Pressable onPress={onDismiss} style={styles.container}>
                {isLoading && (
                    <ActivityIndicator size={60} color={whiteColor} />
                )}

                {!isLoading && (
                    <View style={styles.modalView}>
                        <View
                            style={[
                                styles.modalIcon,
                                { backgroundColor: messageThemeColor },
                            ]}
                        >
                            <MaterialCommunityIcons
                                name={messageIconName}
                                size={75}
                                color={'white'}
                            />
                        </View>
                        <View style={styles.modalContent}>
                            <Text style={styles.headerText}>
                                {headerText || `HEADER`}
                            </Text>
                            <Text style={styles.messageText}>
                                {messageText || `MESSAGE`}
                            </Text>

                            {messageType === MessageTypes.DECISION ||
                            messageType === MessageTypes.DANGEROUS_DECISION ? (
                                <View style={styles.decisionRow}>
                                    <Button
                                        backgroundColor={messageThemeColor}
                                        style={styles.decisionButton}
                                        onPress={onReject}
                                    >
                                        NO
                                    </Button>
                                    <Button
                                        backgroundColor={messageThemeColor}
                                        style={styles.decisionButton}
                                    >
                                        Yes
                                    </Button>
                                </View>
                            ) : (
                                <Button
                                    backgroundColor={messageThemeColor}
                                    style={styles.button}
                                    colorScheme="darkBlue"
                                    onPress={onProceed}
                                >
                                    Okay
                                </Button>
                            )}
                        </View>
                    </View>
                )}
            </Pressable>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 25,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.7)',
    },
    button: {
        width: 300,
        height: 50,
        borderRadius: 12,
    },
    modalView: {
        backgroundColor: 'white',
        width: '100%',
        alignItems: 'center',
        paddingTop: 45,
        borderRadius: 15,
        elevation: 5,
        shadowColor: '#000',
        shadowOpacity: 0.25,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 2 },
    },
    modalIcon: {
        backgroundColor: 'grey',
        height: 100,
        width: 100,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: -50,
        elevation: 5,
        shadowColor: '#000',
        shadowOpacity: 0.25,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 2 },
    },
    modalContent: {
        width: '100%',
        alignItems: 'center',
        padding: 20,
    },
    headerText: {
        textAlign: 'center',
        marginBottom: 10,
        fontFamily: 'Poppins-Bold',
        fontSize: 24,
        // fotn sizes small=13, big=24, normal=16
    },
    messageText: {
        textAlign: 'center',
        marginBottom: 20,
        fontFamily: 'Poppins',
        fontSize: 16,
    },
    decisionRow: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-around',
    },
    decisionButton: {
        width: 'auto',
        height: 50,
        borderRadius: 12,
    },
    icon: {
        color: 'white',
        marginRight: 8,
    },
});

export default MessageModal;
