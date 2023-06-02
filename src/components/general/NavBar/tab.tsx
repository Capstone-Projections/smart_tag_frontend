import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';

import CoursesScreen from '../../../screens/studentScreens/courses/coursesScreen';
import NFCScreen from '../../../screens/studentScreens/nfc/nfcScreen';
import PeopleScreen from '../../../screens/studentScreens/people/peopleScreen';
import QRCodeScreen from '../../../screens/studentScreens/qrcode/qrcode';
import { Text } from '../Text';

const Tab = createBottomTabNavigator();

const Tabs = () => {
  const theme = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Courses') {
            iconName = 'school';
          } else if (route.name === 'Scan QR Code') {
            iconName = 'qr-code-scanner';
          } else if (route.name === 'NFC') {
            iconName = 'nfc';
          } else if (route.name === 'People') {
            iconName = 'people';
          }
          return (
            <MaterialIcons
              name={iconName as keyof typeof MaterialIcons.glyphMap}
              size={size}
              color={color}
            />
          );
        },
        tabBarStyle: {
          backgroundColor: 'white',
          borderTopWidth: 0,
        },
      })}
    >
      <Tab.Screen name="Courses" component={CoursesScreen} />
      <Tab.Screen name="Scan QR Code" component={QRCodeScreen} />
      <Tab.Screen name="NFC" component={NFCScreen} />
      <Tab.Screen name="People" component={PeopleScreen} />
    </Tab.Navigator>
  );
};

export default Tabs;
