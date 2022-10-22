import {
  View,
  TouchableWithoutFeedback,
  StyleSheet,
  ToastAndroid,
  Keyboard,
} from "react-native";

import { useState, useEffect } from "react";
import Input from "./Input";
import { Styles } from "../../constants/styles";
import Button from "../UI/Button";
import { getFormatDate } from "../../util/date";
import { useNavigation } from "@react-navigation/native";
import PressableIcon from "../UI/PressableIcon";
import StyledText from "../UI/StyledText";
import AsyncStorage from "@react-native-async-storage/async-storage";

const generateTodaysDate = () => {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();
  today = mm + "/" + dd + "/" + yyyy;
  return today.toString();
};

const todayDate = generateTodaysDate();

const PracticeForm = ({ onSubmit, defaultValues, onEdit }) => {
  const [loggedUserEmail, setLoggedUserEmail] = useState();
  const [loggedUserFullName, setloggedUserFullName] = useState();

  const [inputs, setInputs] = useState({
    title: {
      value: defaultValues ? defaultValues.title : "",
      isValid: true,
    },
    date: {
      value: todayDate,
      isValid: true,
    },
    author: {
      value: defaultValues ? defaultValues.author : "",
      isValid: true,
    },
    description: {
      value: defaultValues ? defaultValues.description : "",
      isValid: true,
    },
    ratings: [],
  });

  const [favorite, setFavorite] = useState(defaultValues?.favorite); //check if available first

  const navigate = useNavigation();

  useEffect(() => {
    getLoggedUserInfo();
  }, []);

  const showToast = () => {
    if (defaultValues) {
      ToastAndroid.show("Practice edited!", ToastAndroid.SHORT);
    } else {
      ToastAndroid.show("Practice added!", ToastAndroid.SHORT);
    }
  };

  const inputChangeHandler = (inputIdenfitfier, enteredValue) => {
    setInputs((curInputs) => {
      return {
        ...curInputs,
        [inputIdenfitfier]: { value: enteredValue, isValid: true },
      };
    });
  };

  const getLoggedUserInfo = async () => {
    setLoggedUserEmail(await AsyncStorage.getItem("userEmail"));
    setloggedUserFullName(await AsyncStorage.getItem("userName"));
  };

  const toggleFavorites = () => {
    setFavorite(!favorite);
  };

  const submitHandler = () => {
    const date = getFormatDate(new Date(inputs.date.value));
    const practiceData = {
      title: inputs.title.value,
      date: date,
      description: inputs.description.value,
      author: inputs.author.value,
      favorite: favorite,
      ratings: [{ email: loggedUserEmail + "s", rating: 5 }],
      cumulativeRating: { average: 5 },
    };
    const dateIsValid =
      practiceData.date.toString().length > 0 &&
      practiceData.date.toString() !== "Invalid Date";
    const descriptionIsValid = practiceData.description.trim().length > 0;
    const titleIsValid = practiceData.title.length > 0;
    const authorIsValid = practiceData.author.length > 0;

    if (
      !dateIsValid ||
      !descriptionIsValid ||
      !titleIsValid ||
      !authorIsValid
    ) {
      setInputs((curInputs) => {
        return {
          title: { value: curInputs.title.value, isValid: titleIsValid },
          date: { value: curInputs.date.value, isValid: dateIsValid },
          author: { value: curInputs.author.value, isValid: authorIsValid },
          description: {
            value: curInputs.description.value,
            isValid: descriptionIsValid,
          },
        };
      });
      return;
    }

    if (defaultValues) {
      const editValues = {
        title: inputs.title.value,
        date: date,
        description: inputs.description.value,
        author: inputs.author.value,
        favorite: favorite,
      };
      onEdit(editValues);
    } else {
      onSubmit(practiceData);
      setInputs({
        title: { value: "", isValid: titleIsValid },
        date: { value: "", isValid: titleIsValid },
        author: { value: "", isValid: titleIsValid },
        description: { value: "", isValid: titleIsValid },
      });
    }

    showToast();
  };

  const formIsInvalid =
    !inputs.title.isValid ||
    !inputs.date.isValid ||
    !inputs.author.isValid ||
    !inputs.description.isValid;

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.inputRow}>
          <Input
            label="Title"
            style={styles.rowInput}
            invalid={!inputs.title.isValid}
            textInputConfig={{
              onChangeText: inputChangeHandler.bind(this, "title"),
              value: inputs.title.value,
            }}
          />
          <Input
            label="Date"
            style={styles.rowInput}
            invalid={!inputs.date.isValid}
            textInputConfig={{
              onChangeText: inputChangeHandler.bind(this, "date"),
              maxLength: 10,
              value: inputs.date.value,
              placeholder: todayDate,
            }}
          />
          <Input
            label="Author"
            style={styles.rowInput}
            invalid={!inputs.author.isValid}
            textInputConfig={{
              onChangeText: inputChangeHandler.bind(this, "author"),
              value: inputs.author.value,
            }}
          />
          <Input
            label="Description"
            style={styles.rowInput}
            invalid={!inputs.description.isValid}
            textInputConfig={{
              multiline: true,
              onChangeText: inputChangeHandler.bind(this, "description"),
              value: inputs.description.value,
            }}
          />
          {defaultValues && (
            <PressableIcon
              icon="heart"
              size={24}
              color={favorite ? "red" : "black"}
              onPress={toggleFavorites}
              style={styles.favoriteIcon}
            />
          )}
        </View>
        {formIsInvalid && (
          <StyledText style={styles.errorText}>
            No field should be empty!
          </StyledText>
        )}
        <View style={styles.buttonContainer}>
          <Button
            style={styles.buttonConfirm}
            onPress={submitHandler}
            textColor="white"
          >
            {defaultValues ? "Edit" : "Add"}
          </Button>
          {defaultValues && (
            <Button
              style={styles.buttonCancel}
              onPress={() => navigate.goBack()}
              textColor="black"
            >
              Cancel
            </Button>
          )}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    marginTop: 20,
  },

  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonConfirm: {
    backgroundColor: Styles.colors.darkBlue,
    width: 150,
    padding: 10,
    borderRadius: 16,
  },
  buttonCancel: {
    backgroundColor: "transparent",
    borderColor: Styles.colors.darkBlue,
    borderWidth: 1,
    width: 150,
    padding: 10,
    borderRadius: 16,
    marginLeft: 5,
  },

  errorText: {
    textAlign: "center",
    color: Styles.colors.error500,
    marginTop: 10,
    marginBottom: 20,
  },
  favoriteIcon: {
    position: "absolute",
    top: -10,
    right: 0,
  },
});

export default PracticeForm;
