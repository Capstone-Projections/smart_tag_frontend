import { View, Text, StyleSheet, Image } from 'react-native';
import React, { useContext, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, VStack } from 'native-base';
import * as Animatable from 'react-native-animatable';
import { AuthContext } from '../../../context/AuthContext';
import { LaunchScreenProps } from './props';
import { style } from './styles';

const LaunchScreen = (props: LaunchScreenProps) => {
    const { setUserType } = useContext(AuthContext);

    const handleStudentPress = () => {
        setUserType('student');
        props.navigation.navigate('Login');
    };

    const handleTeacherPress = () => {
        setUserType('lecturer');
        props.navigation.navigate('Login');
    };
    return (
        <View style={style.container}>
            <SafeAreaView>
                <View style={style.imageContainer}>
                    <Animatable.Image
                        animation="fadeInDown"
                        source={require('../../../assets/images/launch.jpg')}
                        style={style.image}
                    />
                </View>
                <Animatable.View animation="fadeInDown" style={{ padding: 10 }}>
                    <Text style={style.textFirst}>Welcome!</Text>
                    <Text style={style.textSecond}>
                        Are you a student or lecturer?
                    </Text>
                </Animatable.View>
                <Animatable.View animation="fadeInDown">
                    <VStack space={5} alignItems="center">
                        <Button
                            colorScheme="darkBlue"
                            style={style.button}
                            onPress={handleStudentPress}
                        >
                            Student
                        </Button>
                        <Button
                            colorScheme="darkBlue"
                            style={style.button}
                            onPress={handleTeacherPress}
                        >
                            Lecturer
                        </Button>
                    </VStack>
                </Animatable.View>
            </SafeAreaView>
        </View>
    );
};

export default LaunchScreen;
