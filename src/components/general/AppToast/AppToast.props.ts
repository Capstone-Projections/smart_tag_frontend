export interface ToastAlertProps {
    id: number | string;
    status?: string;
    variant: string;
    title: string;
    description: string;
    isClosable?: boolean;
    [key: string]: any; // Allow additional props
}
