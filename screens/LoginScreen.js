import { Alert, Image, StyleSheet, View } from "react-native";
import { useState, useContext } from "react";
import { PracticesContext } from "../store/practices-context";
import { login } from "../util/auth";
import AuthContent from "../components/Auth/AuthContent";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import { Styles } from "../constants/styles";
import StyledText from "../components/UI/StyledText";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { fetchAllUsers } from "../util/httpRequests";

const LoginScreen = () => {
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const practiceCtx = useContext(PracticesContext);

  async function loginHandler({ email, password }) {
    setIsAuthenticating(true);
    try {
      const token = await login(email, password);
      practiceCtx.authenticate(token.idToken);

      const loggedUser = await findUserByEmail(token.email);
      console.log(loggedUser);
      await AsyncStorage.setItem("userID", loggedUser.id);
      await AsyncStorage.setItem("userEmail", loggedUser.email);
      await AsyncStorage.setItem("userName", loggedUser.fullName);
    } catch (error) {
      console.log(error);
      Alert.alert(
        "Authentication failed!",
        "Could not log you in. Please check your credentials."
      );
      setIsAuthenticating(false);
    }
  }

  const findUserByEmail = async (email) => {
    const allUsers = await fetchAllUsers();
    const user = allUsers.find((user) => user.email === email);
    return user;
  };

  if (isAuthenticating) {
    return <LoadingOverlay message="Loging you in" />;
  }

  return (
    <>
      <View style={styles.logoContainer}>
        <Image source={require("../assets/logo.png")} style={styles.logo} />
        <StyledText style={styles.logoText}>Login</StyledText>
      </View>
      <AuthContent isLogin onAuthenticate={loginHandler} />
    </>
  );
};

const styles = StyleSheet.create({
  logoContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
    borderBottomWidth: 1,
    padding: 10,
    borderBottomColor: Styles.colors.darkBlue,
  },
  logo: {
    width: 150,
    height: 150,
  },
  logoText: {
    fontSize: 24,
  },
});

export default LoginScreen;
