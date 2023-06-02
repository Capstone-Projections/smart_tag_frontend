import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const PeopleScreen = ({}) => {
  return (
    <View style={styles.container}>
      <Text>People Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'yellow',
  },
});

export default PeopleScreen;
