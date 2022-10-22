import { Alert, Image, StyleSheet, View } from "react-native";
import { useState, useContext } from "react";

import { PracticesContext } from "../store/practices-context";
import { createUser } from "../util/auth";
import AuthContent from "../components/Auth/AuthContent";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import { Styles } from "../constants/styles";
import { storeUsers } from "../util/httpRequests";
import StyledText from "../components/UI/StyledText";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SignupScreen = ({ navigation }) => {
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const practiceCtx = useContext(PracticesContext);

  async function signupHandler({ email, password }) {
    setIsAuthenticating(true);
    try {
      const token = await createUser(email, password);
      const userData = {
        email: email,
      };
      practiceCtx.authenticate(token.idToken);
      const id = await storeUsers(userData);
      practiceCtx.addUser({ ...userData, id: id });

      await AsyncStorage.setItem("userID", id);

      navigation.navigate("EnterUserDetails", { userEmail: email, userId: id });
    } catch (error) {
      Alert.alert(
        "Authentication failed!",
        "Could not create user, please check you credentials or try again later."
      );
      setIsAuthenticating(false);
    }
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="Creating user" />;
  }

  return (
    <>
      <View style={styles.logoContainer}>
        <Image source={require("../assets/logo.png")} style={styles.logo} />
        <StyledText style={styles.logoText}>Signup for free!</StyledText>
      </View>

      <AuthContent isLogin={false} onAuthenticate={signupHandler} />
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

export default SignupScreen;
