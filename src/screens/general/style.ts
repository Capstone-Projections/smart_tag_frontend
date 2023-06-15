import styled from 'styled-components/native';
import Constants from 'expo-constants';

const StatusBarHeight = Constants.statusBarHeight;

export const Colors = {
    primary: '#196B9A',
    secondary: '#ffffff',
    lightGreen: 'rgba(16,185,129,0.1)',
};
const { primary, secondary, lightGreen } = Colors;

export const StyledContainer = styled.View`
    flex: 1;
    padding: 20px;
    padding-top: ${StatusBarHeight + 30}px;
    background-color: ${secondary};
`;

export const TopHalf = styled.View`
    flex: 1;
    justify-content: center;
    padding: 20px;
`;
export const IconBg = styled.View`
    width: 250px;
    height: 250px;
    background-color: ${Colors.lightGreen};
    border-radius: 250px;
    justify-content: center;
    align-items: center;
`;

export const BottomHalf = styled(TopHalf)`
    justify-content: space-around;
`;

export const OTPInputContainer = styled.View`
    justify-content: center;
    align-items: center;
`;

export const TextInputHidden = styled.TextInput`
    width: 1px;
    position: absolute;
    opacity: 0;
`;

export const CodeInputsContainer = styled.Pressable`
    width: 70%;
    flex-direction: row;
    justify-content: space-between;
    margin-right: 40px;
`;

export const CodeInput = styled.View`
    border-color: black;
    min-width: 20%;
    border-width: 2px;
    border-radius: 8px;
    padding: 12px;
    margin: 1px;
`;

export const CodeInputText = styled.Text`
    font-size: 22px;
    font-weight: bold;
    text-align: center;
    color: black;
`;

export const CodeInputFocused = styled(CodeInput)`
    border-color: ${primary};
`;
