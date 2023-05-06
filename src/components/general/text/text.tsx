import React from 'react';
import { Text as RNText} from 'react-native';
import {createTextStyles} from './text.stylesheet';
import { AppTextProps} from './text.prop';


export function AppText(props: AppTextProps)
{
    const style = createTextStyles(props.type, props.color,props.weight);
    
    return(<RNText style={classes!.text}>{props.text}</RNText>);
};