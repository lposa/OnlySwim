import {View, Text, TextInput, StyleSheet} from 'react-native';
import {Styles} from '../../constants/styles';
import StyledText from '../UI/StyledText';

const Input = ({label, textInputConfig, invalid}) => {
  let inputStyles = [styles.input];

  if (textInputConfig && textInputConfig.multiline) {
    inputStyles.push(styles.inputMultiline);
  }

  if (invalid) {
    inputStyles.push(styles.invalidInput);
  }

  return (
    <View style={styles.inputContainer}>
      <StyledText style={styles.label}>{label}</StyledText>
      <TextInput {...textInputConfig} style={inputStyles} />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 4,
    marginVertical: 8,
  },
  label: {
    fontSize: 18,
    textAlign: 'center',
    paddingVertical: 8,
  },
  input: {
    backgroundColor: Styles.colors.mainBlue,
    color: 'white',
    padding: 6,
    borderRadius: 12,
    fontSize: 18,
  },
  inputMultiline: {
    minHeight: 150,
    textAlignVertical: 'top',
  },
  invalidLabel: {color: Styles.colors.error500},
  invalidInput: {backgroundColor: Styles.colors.error50},
});

export default Input;
