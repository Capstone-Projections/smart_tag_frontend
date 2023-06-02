import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const CoursesScreen = ({}) => {
  return (
    <View style={styles.container}>
      <Text>Courses Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red',
  },
});

export default CoursesScreen;