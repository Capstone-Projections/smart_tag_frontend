import { AppButtonProps } from './AppButton.prop';
import styled from 'styled-components/native';
import { Text } from '../Text/AppText';
import {
  appBlue,
  coursesdBlue,
  coursesdBlue2,
  coursesdGreen,
  coursesdYellow,
} from '../../../resources/colors/colors';

const AppButton = styled.TouchableOpacity<AppButtonProps>`
  backgroundcolor:${(props) =>
    props.type === 'cancel'
      ? 'white'
      : props.type === 'add'
      ? appBlue
      : props.type === 'status'
      ? appBlue
      : appBlue}; 
  borderradius: ${(props) =>
    props.type === 'cancel' ? '4px' : props.type === 'add' ? '4px' : '7px'};
  padding: ${(props) =>
    props.type === 'cancel' ? '4px' : props.type === 'add' ? '4px' : '10px'};
  width: ${(props) =>
    props.type === 'cancel'
      ? '70px'
      : props.type === 'add'
      ? '70px'
      : props.type === 'status'
      ? '300px'
      : '344px'};
  height: ${(props) =>
    props.type === 'cancel'
      ? '25px'
      : props.type === 'add'
      ? '25px'
      : props.type === 'status'
      ? '58px'
      : '48px'};
  borderwidth: ${(props) =>
    props.type === 'cancel'
      ? '2px'
      : props.type === 'add'
      ? '0px'
      : props.type === 'status'
      ? '0px'
      : '0px'};
  bordercolor: ${(props) =>
    props.type === 'cancel' ? appBlue : 'rgba(0,0,0,0.0)'};
  margin-bottom: 20px;
  align-items: center;
`;

export const Button = ({
  text,
  disabled,
  onPress,
  textType,
  textColor,
  type,
  size,
}: AppButtonProps) => (
  <AppButton text={text} onPress={onPress} type={type} size={size}>
    <Text type={textType} color={textColor}>
      {text}
    </Text>
  </AppButton>
);
