import { View, StyleSheet, ScrollView } from "react-native";
import { useState } from "react";
import Input from "./Input";
import Button from "../UI/Button";
import { Styles } from "../../constants/styles";

const AuthForm = ({ isLogin, onSubmit, credentialsInvalid }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const inputChangeHandler = (inputType, enteredValue) => {
    switch (inputType) {
      case "email":
        setEmail(enteredValue);
        break;
      case "confirmEmail":
        setConfirmEmail(enteredValue);
        break;
      case "password":
        setPassword(enteredValue);
        break;
      case "confirmPassword":
        setConfirmPassword(enteredValue);
        break;
    }
  };
  function submitHandler() {
    onSubmit({
      email: email,
      confirmEmail: confirmEmail,
      password: password,
      confirmPassword: confirmPassword,
    });
  }

  const {
    email: emailIsInvalid,
    confirmEmail: emailsDontMatch,
    password: passwordIsInvalid,
    confirmPassword: passwordsDontMatch,
  } = credentialsInvalid;

  return (
    <ScrollView>
      <Input
        label="Email"
        invalid={emailIsInvalid}
        textInputConfig={{
          onChangeText: inputChangeHandler.bind(this, "email"),
          value: email,
        }}
      />
      {!isLogin && (
        <Input
          label="Confirm Email"
          invalid={emailsDontMatch}
          textInputConfig={{
            onChangeText: inputChangeHandler.bind(this, "confirmEmail"),
            value: confirmEmail,
          }}
        />
      )}
      <Input
        label="Password"
        style={styles.rowInput}
        invalid={passwordIsInvalid}
        textInputConfig={{
          onChangeText: inputChangeHandler.bind(this, "password"),
          value: password,
          secureTextEntry: true,
        }}
      />
      {!isLogin && (
        <Input
          label="Confirm Passoword"
          invalid={passwordsDontMatch}
          textInputConfig={{
            onChangeText: inputChangeHandler.bind(this, "confirmPassword"),
            value: confirmPassword,
            secureTextEntry: true,
          }}
        />
      )}
      <View style={styles.buttonContainer}>
        <Button style={styles.button} onPress={submitHandler} textColor="white">
          {isLogin ? "Log in" : "Sign Up"}
        </Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: "center",
  },
  button: {
    backgroundColor: Styles.colors.darkBlue,
    marginTop: 30,
    padding: 10,
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
  },
});

export default AuthForm;
