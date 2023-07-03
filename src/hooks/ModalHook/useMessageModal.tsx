import { useState } from 'react';
import {
    ExtraMessageModalPropsType,
    RequiredMessageModalPropsType,
} from './types';
import { MessageTypes } from '../../components/general/modals/types';

const useMessageModal = () => {
    const [messageModalVisible, setMessageModalVisible] = useState(false);
    const [requiredMessageModalProps, setRequiredMessageModalProps] =
        useState<RequiredMessageModalPropsType>({
            messageType: MessageTypes.INFO,
            headerText: '',
            messageText: '',
            onDismiss: () => {},
            onProceed: () => {},
        });
    const [extraMessageModalProps, setExtraMessageModalProps] = useState<
        ExtraMessageModalPropsType | undefined
    >({});

    const [isLoading, setIsLoading] = useState(false);

    const hideModal = () => {
        setMessageModalVisible(false);
    };

    const showMessageModal = (
        messageType: MessageTypes,
        headerText: string,
        messageText: string,
        onProceed: () => any,
        extraProps?: ExtraMessageModalPropsType
    ) => {
        setMessageModalVisible(true);
        setRequiredMessageModalProps({
            messageType,
            headerText,
            messageText,
            onProceed,
            onDismiss: hideModal,
        });
        setExtraMessageModalProps(extraProps);
    };

    const messageModalState = {
        messageModalVisible,
        ...requiredMessageModalProps,
        ...extraMessageModalProps,
        isLoading,
    };
    return {
        messageModalState,
        showMessageModal,
        hideModal,
        setIsLoading,
    };
};
export default useMessageModal;
