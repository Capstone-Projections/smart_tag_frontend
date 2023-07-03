import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ColorValue } from 'react-native';

export enum MessageTypes {
    'FAIL',
    'SUCCESS',
    'WARNING',
    'DECISION',
    'DANGEROUS_DECISION',
    'INFO',
}

export type MessageIconNameType = keyof typeof MaterialCommunityIcons.glyphMap;

export type MessageThemeColorType = ColorValue;

export type MessageModalProps = {
    messageModalVisible: boolean;
    messageType: MessageTypes;
    headerText: string;
    messageText?: string;
    onDismiss: () => any;
    onProceed?: () => any;
    onReject?: () => any;
    isLoading?: () => any;
};
