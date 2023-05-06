import {createUseStyles} from 'react-jss';
import { TextColorOptions,TextTypeOptions,TextWeightOptions } from './text.prop';
import {useFonts} from 'expo-font';



export function createTextStyles(
    type?: TextTypeOptions,
    color?: TextColorOptions,
    weight?: TextWeightOptions,
){
    const [loaded] = useFonts({
        'Poppins-Bold': require('../../../../assets/fonts/Poppins-Bold.ttf'),
        'Poppins-Regular': require('../../../../assets/fonts/Poppins-Regular.ttf'),
    });
    
    if (!loaded) {
        return null;
    }
    
    return createUseStyles({
        text: {
            fontFamily: weight === 'bold' ? 'Poppins-Bold' : 'Poppins-Regular',
            fontSize: type === 'heading' ? 32 : type === 'subheading' ? 24 : type === 'body' ? 16 : 14,
            color: color === 'primary' ? '#000000' : '#FFFFFF',
        },
    });

}