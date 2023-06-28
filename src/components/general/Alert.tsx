import React from 'react';
import {
    Alert,
    IconButton,
    HStack,
    VStack,
    CloseIcon,
    Text,
} from 'native-base';

interface CustomAlertProps {
    alert: {
        status: string;
        title: string;
    };
    onClose?: () => void;
}

export const CustomAlert: React.FC<CustomAlertProps> = ({ alert, onClose }) => {
    const { status, title } = alert;

    const handleClose = () => {
        if (onClose) {
            onClose();
        }
    };

    return (
        <Alert w="100%" status={status}>
            <VStack space={2} flexShrink={1} w="100%">
                <HStack flexShrink={1} space={2} justifyContent="space-between">
                    <HStack space={2} flexShrink={1}>
                        <Alert.Icon mt="1" />
                        <Text fontSize="md" color="coolGray.800">
                            {title}
                        </Text>
                    </HStack>
                    <IconButton
                        variant="unstyled"
                        _focus={{
                            borderWidth: 0,
                        }}
                        icon={<CloseIcon size="3" />}
                        _icon={{
                            color: 'coolGray.600',
                        }}
                        onPress={handleClose} // Call the onClose function when the button is pressed
                    />
                </HStack>
            </VStack>
        </Alert>
    );
};
