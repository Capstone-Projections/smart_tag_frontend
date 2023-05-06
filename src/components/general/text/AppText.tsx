import * as React from 'react';
import {Text,StyleSheet, TextProps} from 'react-native';
import {AppTextProps} from './AppText.prop'

export const AppText = (props: AppTextProps) => (
    <Text {...props}/>
)
