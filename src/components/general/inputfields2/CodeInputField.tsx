import React, { useRef, useEffect, useState } from 'react';
import {
    OTPInputContainer,
    TextInputHidden,
    CodeInputsContainer,
    CodeInput,
    CodeInputText,
    CodeInputFocused,
} from './style';
import { TextInput } from 'react-native-gesture-handler';
import { InputFieldProps } from './props';
import KeyboardAvoidingWrapper from '../KeyboardWrapper/KeyboardWrapper';
import { KeyboardAvoidingView } from 'react-native';

const CodeInputField: React.FC<InputFieldProps> = ({
    setPinReady,
    code,
    setCode,
    maxlength,
}) => {
    const codeDigitsArray = new Array(maxlength).fill(0);

    //ref for text input
    const textInputRef = useRef<TextInput>(null);

    const handleOnPress = () => {
        setInputContainerIsFocused(true);
        if (textInputRef.current) {
            textInputRef?.current?.focus();
        }
    };

    const [inputContainerIsFocused, setInputContainerIsFocused] =
        useState(false);

    const handleOnBlur = () => {
        setInputContainerIsFocused(false);
    };

    useEffect(() => {
        setPinReady(code.length === maxlength);
        return () => setPinReady(false);
    }, [code, setPinReady, maxlength]);

    const toCodeDigitInput = (_value: any, index: number) => {
        const emptyInputChar = ' ';
        const digit = code[index] || emptyInputChar;

        //formatting
        const isCurrentDigit = index === code.length;
        const isLastDigit = index === maxlength - 1;
        const isCodeFull = code.length === maxlength;

        const isDigitFocused = isCurrentDigit || (isLastDigit && isCodeFull);

        const StyledCodeInput =
            inputContainerIsFocused && isDigitFocused
                ? CodeInputFocused
                : CodeInput;

        return (
            <StyledCodeInput key={index}>
                <CodeInputText>{digit}</CodeInputText>
            </StyledCodeInput>
        );
    };

    return (
        <OTPInputContainer>
            <CodeInputsContainer onPress={handleOnPress}>
                {codeDigitsArray.map(toCodeDigitInput)}
            </CodeInputsContainer>
            <TextInputHidden
                // ref={textInputRef}
                value={code}
                onChangeText={setCode}
                onSubmitEditing={handleOnBlur}
                keyboardType="number-pad"
                returnKeyType="done"
                textContentType="oneTimeCode"
                maxLength={maxlength}
            />
        </OTPInputContainer>
    );
};

export default CodeInputField;
