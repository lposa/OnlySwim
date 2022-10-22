import {Pressable, StyleSheet} from 'react-native';
import {FontAwesome5} from '@expo/vector-icons';
import {AntDesign} from '@expo/vector-icons';

const PressableIcon = ({
  onPress,
  icon,
  size,
  color,
  style,
  isAntIcon,
  fill,
}) => {
  return (
    <Pressable onPress={onPress} style={[styles.pressable, style]}>
      {!isAntIcon && <FontAwesome5 name={icon} size={size} color={color} />}
      {isAntIcon && <AntDesign name={icon} size={size} color={color} />}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  pressable: {
    marginRight: 5,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PressableIcon;
