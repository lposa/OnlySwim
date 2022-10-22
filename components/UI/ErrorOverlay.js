import {View, StyleSheet, Text} from 'react-native';
import {Styles} from '../../constants/styles';
import Button from './Button';

const ErrorOverlay = ({message, onConfirm}) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.text, styles.title]}>An error occured!</Text>
      <Text style={styles.text}>{message}</Text>
      <Button onPress={onConfirm}>Okay</Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: Styles.colors.error500,
  },
  text: {
    textAlign: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default ErrorOverlay;
