import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import {Styles} from '../../constants/styles';
import StyledText from './StyledText';

const Button = ({children, onPress, style, textColor, textSize}) => {
  return (
    <View style={style}>
      <Pressable
        onPress={onPress}
        style={({pressed}) => [styles.button, pressed && styles.pressed]}>
        <StyledText
          style={[styles.text, {color: textColor, fontSize: textSize}]}>
          {children}
        </StyledText>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.7,
  },
  button: {
    width: '100%',
  },
  text: {
    textAlign: 'center',
    fontSize: 16,
  },
});

export default Button;
