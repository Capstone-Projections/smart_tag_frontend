import styled from 'styled-components/native';
import { AppEntryProps, EntryTypeOptions } from './AppEntry.prop';
import { Text } from '../Text/AppText';

export const AppEntry = styled.TextInput<AppEntryProps>`
  fontfamily: Poppins;
  font-size: ${(props) =>
    props.type === 'popup' ? '8.05px' : props.type === 'otp' ? '25px' : '18px'};
  color: #000;
  background-color: #ffffff;
  border: ${(props) =>
    props.type === 'popup'
      ? '0.575px solid rgba(18, 18, 18, 0.6)'
      : props.type === 'otp'
      ? '1px solid #000'
      : '1px solid #196B9A'};
  border-radius: ${(props) =>
    props.type === 'popup' ? '3.45px' : props.type === 'otp' ? '4px' : '7px'};
  padding: ${(props) =>
    props.type === 'popup' ? '4px' : props.type === 'otp' ? '10px' : '10px'};
  width: ${(props) =>
    props.type === 'popup' ? '161px' : props.type === 'otp' ? '48px' : '344px'};
  height: ${(props) =>
    props.type === 'popup' ? '27.6px' : props.type === 'otp' ? '46px' : '48px'};
  flex: none;
  flex-grow: 0;

  marginBottom: ${(props) =>
    props.type === 'popup' ? '8.75px' : props.type === 'otp' ? '53px' : '24px'};

  marginTop: ${(props) =>
    props.type === 'popup' ? '1.65px' : props.type === 'otp' ? '53px' : '12px'};
  align-items: center;
`;

const View = styled.View`
  background-color: #fff;
  justify-content: center;
`;

export const Entry = ({
  type,
  text,
  textWeight,
  textType,
  placeholder,
}: AppEntryProps) => (
  <View>
    <Text type={textType} weight={textWeight}>
      {text}
    </Text>
    <AppEntry type={type} placeholder={placeholder} selectionColor="black" />
  </View>
);
