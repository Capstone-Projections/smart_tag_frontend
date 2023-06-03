import { TextTypeOptions, TextColorOptions } from '../Text/AppText.prop';
import { ButtonProps } from 'react-native';
export interface AppButtonProps {
    text: string;
    disabled?: boolean;
    onPress?: () => void;
    textType?: TextTypeOptions;
    textColor?: TextColorOptions;
    type?: ButtonTypeOptions;
    size?: ButtonSizeOptions;
}

export type ButtonTypeOptions = 'cancel' | 'add' | 'status';
export type ButtonSizeOptions = 'small' | 'large';
