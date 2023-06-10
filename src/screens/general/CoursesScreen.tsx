import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import CoursesList from '../../components/general/Courses/Courses';

export default function CoursesScreen() {
  return (
    <View >
       <Text style={styles.text}>Your Text Component</Text>
      <CoursesList />
      
    </View>
  );
}


const styles = StyleSheet.create({
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    // Add any additional styles for your text component
  },
});