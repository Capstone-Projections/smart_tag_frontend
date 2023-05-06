import {create} from 'jss';
import { TextColorOptions,TextTypeOptions,TextWeightOptions } from './text.prop';
import * as Font from 'expo-font';
import preset from 'jss-preset-default';


//can't be used with react native so you have to write it out like you're writing normal css and figure out a way to do it without javascript
const jss = create(preset());

async function loadFonts() {
    await Font.loadAsync({
    'Poppins-Bold': require('../../../../assets/fonts/Poppins-Bold.ttf'),
    'Poppins-Regular': require('../../../../assets/fonts/Poppins-Regular.ttf'),
    });
}

export function createTextStyles(
    type?: TextTypeOptions,
    color?: TextColorOptions,
    weight?: TextWeightOptions,
){
    loadFonts();
    const dynamicStyles =  jss.createStyleSheet({
        text: {
            fontFamily: weight === 'bold' ? 'Poppins-Bold' : 'Poppins-Regular',
            fontSize: type === 'heading' ? 32 : type === 'subheading' ? 24 : type === 'body' ? 16 : 14,
            color: color === 'primary' ? '#000000' : '#FFFFFF',
        },
    })
    return dynamicStyles;

}

