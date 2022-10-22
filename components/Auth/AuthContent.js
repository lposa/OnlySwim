import {Alert, StyleSheet, View, ScrollView} from 'react-native';
import {useState} from 'react';

import {useNavigation} from '@react-navigation/native';
import AuthForm from '../form/AuthForm';
import Button from '../UI/Button';
import {Styles} from '../../constants/styles';

const AuthContent = ({isLogin, onAuthenticate}) => {
  const [credentialsInvalid, setCredentialsInvalid] = useState({
    email: false,
    password: false,
    confirmEmail: false,
    confirmPassword: false,
  });

  const navigation = useNavigation();

  const switchAuthModeHandler = () => {
    if (isLogin) {
      navigation.navigate('Signup');
    } else {
      navigation.navigate('Login');
    }
  };

  const submitHandler = credentials => {
    let {email, confirmEmail, password, confirmPassword} = credentials;

    email = email.trim();
    password = password.trim();

    const emailIsValid = email.includes('@');
    const passwordIsValid = password.length > 6;
    const emailsAreEqual = email === confirmEmail;
    const passwordsAreEqual = password === confirmPassword;

    if (
      !emailIsValid ||
      !passwordIsValid ||
      (!isLogin && (!emailsAreEqual || !passwordsAreEqual))
    ) {
      Alert.alert('Invalid input', 'Please check your entered credentials.');
      setCredentialsInvalid({
        email: !emailIsValid,
        confirmEmail: !emailIsValid || !emailsAreEqual,
        password: !passwordIsValid,
        confirmPassword: !passwordIsValid || !passwordsAreEqual,
      });
      return;
    }
    onAuthenticate({email, password});
  };

  return (
    <ScrollView>
      <AuthForm
        isLogin={isLogin}
        onSubmit={submitHandler}
        credentialsInvalid={credentialsInvalid}
      />

      <View style={styles.buttonContainer}>
        <Button onPress={switchAuthModeHandler} style={styles.flatButton}>
          {isLogin ? 'Create new user' : 'Log in instead'}
        </Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: 'center',
  },
  flatButton: {
    marginTop: 20,
    borderWidth: 1,
    borderRadius: 16,
    borderColor: Styles.colors.darkBlue,
    padding: 10,
    width: '50%',
  },
});

export default AuthContent;
