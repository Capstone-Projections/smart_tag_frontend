export interface AppTextProps {
    text: string;
    type?: TextTypeOptions | undefined;
    color?: TextColorOptions |undefined;
    weight?: TextWeightOptions | undefined;
}

export type TextTypeOptions = 'heading' | 'subheading' | 'body' | 'description';
export type TextColorOptions = 'primary' | 'secondary';
export type TextWeightOptions = 'bold' | 'normal';