import * as React from 'react';
import {Text} from 'react-native';
import {AppTextProps} from './AppText.prop'
import { styles } from './AppText.stylesheet';


export const AppText = ({margin,style,center,...props}: AppTextProps) => (

    <Text {...props} style = {[styles.text ,margin && styles.margin,center &&styles.center,style]}/>
)

AppText.Title = ({style,...props}: AppTextProps) =>(
    <AppText {...props} style = {[styles.title,style]} />
)

AppText.Subtitle = ({style,...props}: AppTextProps) =>(
    <AppText {...props} style = {[styles.subtitle,style]}/>
)

AppText.Body = ({style,...props}: AppTextProps) =>(
    <AppText {...props} style = {style} />
)

AppText.Error = ({style,...props}: AppTextProps) =>(
    <AppText {...props} style = {[styles.error,style]} />
)

