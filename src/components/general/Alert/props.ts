export interface CustomAlertProps {
    alert: {
        status: string;
        title: string;
    };
    onClose?: () => void;
}
