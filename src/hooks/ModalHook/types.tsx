import { MessageTypes } from '../../components/general/modals/types';

export type RequiredMessageModalPropsType = {
    messageType: MessageTypes;
    headerText: string;
    messageText: string;
    onDismiss: () => any;
    onProceed: () => any;
};

export type ExtraMessageModalPropsType = {
    onReject?: () => any;
    isLoading?: () => any;
};
