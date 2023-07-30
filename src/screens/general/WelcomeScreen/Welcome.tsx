import { Image, StyleSheet, Text, View } from 'react-native';
import React, { useContext } from 'react';
import { appBlue, whiteColor } from '../../../resources/colors/colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, VStack } from 'native-base';
import { WelcomeScreenProps } from './props';
import { AuthContext } from '../../../context/AuthContext';
import * as Animatable from 'react-native-animatable';

const Welcome = (props: WelcomeScreenProps) => {
    const { setUserType } = useContext(AuthContext);

    const handleStudentPress = () => {
        setUserType('student');
        props.navigation.replace('LoginScreen');
    };

    const handleTeacherPress = () => {
        setUserType('lecturer');
        props.navigation.replace('LoginScreen');
    };
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Animatable.Image
                    animation="tada"
                    source={require('../../../../assets/images/students.png')}
                    resizeMode="contain"
                    style={styles.image}
                />
            </View>
            <View style={styles.footer}>
                <Text style={styles.textFirst}>Welcome!</Text>
                <Text style={styles.textSecond}>
                    Are you a student or lecturer?
                </Text>
                <VStack space={2} alignItems="center">
                    <Button
                        colorScheme="darkBlue"
                        style={styles.button}
                        onPress={handleStudentPress}
                    >
                        Student
                    </Button>
                    <Button
                        colorScheme="darkBlue"
                        style={styles.button}
                        onPress={handleTeacherPress}
                    >
                        Lecturer
                    </Button>
                </VStack>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: appBlue,
    },
    header: {
        flex: 3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    footer: {
        flex: 2,

        backgroundColor: whiteColor,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 40,
        paddingVertical: 10,
        justifyContent: 'center',
    },
    image: {
        width: '100%',
        height: '100%',
    },

    textFirst: {
        fontSize: 28,
        textAlign: 'center',
        fontFamily: 'Poppins',
    },
    textSecond: {
        fontSize: 15,

        textAlign: 'center',
        fontFamily: 'Poppins',
    },
    button: {
        width: '100%',
        height: 58,
        borderRadius: 8,
    },
});

export default Welcome;
