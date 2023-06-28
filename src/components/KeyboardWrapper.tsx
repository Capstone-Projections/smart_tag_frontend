import React from 'react';
import {
    KeyboardAvoidingView,
    ScrollView,
    TouchableWithoutFeedback,
    Keyboard,
    StyleSheet,
    Platform,
} from 'react-native';

interface Props {
    children: any;
}

const KeyboardAvoidingWrapper: React.FC<Props> = ({ children }) => {
    return (
        <KeyboardAvoidingView
            style={{ flex: 1, backgroundColor: 'white' }}
            behavior={Platform.OS === 'ios' ? 'position' : 'height'}
        >
            <ScrollView>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    {children}
                </TouchableWithoutFeedback>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default KeyboardAvoidingWrapper;
