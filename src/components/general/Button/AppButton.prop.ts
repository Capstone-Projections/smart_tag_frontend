import { TextTypeOptions,TextColorOptions } from "../Text/AppText.prop";
export interface AppButtonProps {
    text: string;
    disabled?: boolean;
    onClick?: Function;
    textType?: TextTypeOptions;
    textColor?: TextColorOptions;
    type?: ButtonTypeOptions;
    size?: ButtonSizeOptions;
};

export type ButtonTypeOptions = 'cancel'|'add'|'status';
export type ButtonSizeOptions = 'small'|'large';