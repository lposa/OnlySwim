import {View, StyleSheet} from 'react-native';
import {useState} from 'react';
import Input from './Input';
import {Styles} from '../../constants/styles';
import Button from '../UI/Button';
import {getFormatDate} from '../../util/date';

const UserDetailsForm = ({userEmail, onSubmit}) => {
  const [inputs, setInputs] = useState({
    fullName: {
      value: '',
      isValid: true,
    },
    birthday: {
      value: '',
      isValid: true,
    },
    phone: {
      value: '',
      isValid: true,
    },
    role: {
      value: '',
      isValid: true,
    },
    description: {
      value: '',
      isValid: true,
    },
    profilePic: {
      value: '',
      isValid: true,
    },
  });

  const inputChangeHandler = (inputIdenfitfier, enteredValue) => {
    setInputs(curInputs => {
      return {
        ...curInputs,
        [inputIdenfitfier]: {value: enteredValue, isValid: true},
      };
    });
  };

  const submitHandler = () => {
    const birthday = getFormatDate(new Date(inputs.birthday.value));
    const userData = {
      email: userEmail,
      fullName: inputs.fullName.value,
      birthday: birthday,
      phone: inputs.phone.value,
      role: inputs.role.value,
      description: inputs.description.value,
      profilePic: inputs.profilePic.value,
    };
    const dateIsValid =
      userData.birthday.toString().length > 0 &&
      userData.birthday.toString() !== 'Invalid Date';
    const descriptionIsValid = userData.description.trim().length > 0;
    const fieldsIsValid =
      userData.fullName.length > 0 ||
      userData.phone.length > 0 ||
      userData.role.length > 0;

    if (!dateIsValid || !descriptionIsValid || !fieldsIsValid) {
      setInputs(curInputs => {
        return {
          fullName: {value: curInputs.fullName.value, isValid: fieldsIsValid},
          birthday: {value: curInputs.birthday.value, isValid: dateIsValid},
          phone: {value: curInputs.phone.value, isValid: fieldsIsValid},
          role: {value: curInputs.role.value, isValid: fieldsIsValid},
          description: {
            value: curInputs.description.value,
            isValid: descriptionIsValid,
          },
        };
      });
      return;
    }
    onSubmit(userData);
  };

  return (
    <View style={styles.form}>
      <View style={styles.inputRow}>
        <Input
          label="Full Name"
          style={styles.rowInput}
          invalid={!inputs.fullName.isValid}
          textInputConfig={{
            onChangeText: inputChangeHandler.bind(this, 'fullName'),
            value: inputs.fullName.value,
          }}
        />
        <Input
          label="Birthday"
          style={styles.rowInput}
          invalid={!inputs.birthday.isValid}
          textInputConfig={{
            onChangeText: inputChangeHandler.bind(this, 'birthday'),
            value: inputs.birthday.value,
          }}
        />

        <Input
          label="Phone"
          style={styles.rowInput}
          invalid={!inputs.phone.isValid}
          textInputConfig={{
            onChangeText: inputChangeHandler.bind(this, 'phone'),
            value: inputs.phone.value,
          }}
        />
        <Input
          label="Role"
          style={styles.rowInput}
          invalid={!inputs.role.isValid}
          textInputConfig={{
            onChangeText: inputChangeHandler.bind(this, 'role'),
            value: inputs.role.value,
          }}
        />
        <Input
          label="Description"
          style={styles.rowInput}
          invalid={!inputs.description.isValid}
          textInputConfig={{
            onChangeText: inputChangeHandler.bind(this, 'description'),
            value: inputs.description.value,
          }}
        />
        <Input
          label="Profile Pic"
          style={styles.rowInput}
          invalid={!inputs.profilePic.isValid}
          textInputConfig={{
            onChangeText: inputChangeHandler.bind(this, 'profilePic'),
            value: inputs.profilePic.value,
          }}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button style={styles.button} textColor="white" onPress={submitHandler}>
          Let's get started
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: Styles.colors.darkBlue,
    width: 150,
    padding: 10,
    borderRadius: 16,
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
});

export default UserDetailsForm;
