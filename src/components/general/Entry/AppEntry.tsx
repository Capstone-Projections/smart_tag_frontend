import styled from 'styled-components/native'
import { AppEntryProps,EntryTypeOptions } from "./AppEntry.prop";
import { appBlue } from '../../../resources/colors/colors';
import { Text } from "../Text/AppText";

export const AppEntry = styled.TextInput<AppEntryProps>`
    font-size:  ${props => props.type === 'popup'?'8.05px': props.type ==='otp'? '16px':'18px'};
    color: #000;
    background-color: #fff;
    border:${props => props.type === 'popup'? '0.575px solid rgba(18, 18, 18, 0.6)'
    :props.type === 'otp'? '1px solid #000':'1px solid #196B9A'};
    border-radius: ${props => props.type === 'popup'?'3.45px': props.type ==='otp'? '4px':'7px'};
    padding:  ${props => props.type === 'popup'?'4px': props.type ==='otp'? '0px':'10px'};
    width:  ${props => props.type === 'popup'?'161px': props.type ==='otp'? '48px':'344px'};
    height:  ${props => props.type === 'popup'?'27.6px': props.type ==='otp'? '46px':'48px'};
    flex: none;
    flex-grow: 0;
    padding-buttom: 10px;
`;

const Container = styled.View`
    paddingTop: 10px;
    paddingVertical: 10px;
`
//change the selection color when you have to change it when creating the actual entry

export const Entry = ({type,text,placeholder,textWeight,textType}:AppEntryProps) => (
    <Container>
        <Text type={textType} weight={textWeight}>{text}</Text>
        <AppEntry type={type} placeholder={placeholder} />
    </Container>
);
