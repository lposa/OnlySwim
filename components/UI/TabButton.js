import {View, StyleSheet, Text} from 'react-native';
import React from 'react';
import {Styles} from '../../constants/styles';
import {Ionicons} from '@expo/vector-icons';

const TabButton = ({color, size, name}) => {
  return (
    <View style={styles.container}>
      <Ionicons name={name} size={36} color={color} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderRadius: 50,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TabButton;
