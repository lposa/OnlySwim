import { View, StyleSheet, Alert, Image } from "react-native";
import { useContext, useState, useEffect } from "react";
import PressableIcon from "../UI/PressableIcon";
import { PracticesContext } from "../../store/practices-context";
import { useNavigation } from "@react-navigation/native";
import StyledText from "../UI/StyledText";
import {
  deletePractice,
  updatePractice,
  updatePracticeRating,
  updatePracticeRatingList,
} from "../../util/httpRequests";

import { Styles } from "../../constants/styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Button from "../UI/Button";

const PracticeItem = ({
  id,
  date,
  author,
  title,
  description,
  ratings,
  cumulativeRating,
  practice,
}) => {
  const practicesCtx = useContext(PracticesContext);
  const navigation = useNavigation();
  const [ratingAverage, setRatingAverage] = useState(0);
  const [isRated, setIsRated] = useState(-1);
  const [loggedUserEmail, setLoggedUserEmail] = useState();

  useEffect(() => {
    getLoggedUserEmail();
    if (Boolean(ratings)) {
      calculateRatingAverage();
      //setUserRating();
    }
  }, [practice]);

  const getLoggedUserEmail = async () => {
    setLoggedUserEmail(await AsyncStorage.getItem("userEmail"));
  };

  const deleteItemHandler = async (id) => {
    await deletePractice(id);
    practicesCtx.deletePractice(id);
  };

  const editItemHandler = () => {
    navigation.navigate("EditPractice", { practiceId: id });
  };

  const submitRatings = async (index) => {
    const practiceToRate = practicesCtx.practices.find(
      (item) => item.id === id
    );

    let findIfUserRated = practiceToRate.ratings.find(
      (item) => item.email === loggedUserEmail
    );

    if (Boolean(!findIfUserRated)) {
      const ratingData = { email: loggedUserEmail, rating: index };
      practicesCtx.updateRatingsList(id, ratingData);

      await updatePracticeRatingList(id, [
        ...ratings,
        { email: loggedUserEmail, rating: index },
      ]);
      await updatePracticeRating(id, {
        average: cumulativeRating.average + index,
      });
      calculateRatingAverage();
    } else if (findIfUserRated) {
      Alert.alert(
        "You already rated this practice",
        "You can only rate a practice one time. If you are unhappy with your rating, clear it, and then rate again."
      );
    }
  };

  const calculateRatingAverage = () => {
    let count = ratings.length; //ratings is an array, the length will give us number of total ratings
    let average = cumulativeRating.average / count;

    setRatingAverage(average.toFixed());
  };

  const setUserRating = () => {
    const practiceToRate = practicesCtx.practices.find(
      (item) => item.id === id
    );
    let findIfUserRated = practiceToRate.ratings.find(
      (item) => item.email === loggedUserEmail
    );

    setIsRated(findIfUserRated.rating - 1);
  };

  return (
    <View style={styles.practiceItemWrapper}>
      <View style={styles.practiceItemTopBar}>
        <Image
          source={require("../../assets/profile-pic.png")}
          style={styles.profilePic}
        />
        <StyledText style={styles.practiceItemAuthor}>{author}</StyledText>
      </View>
      <View style={styles.practiceItemMiddleBar}>
        <StyledText isHeaderText style={styles.textTitle}>
          {title}
        </StyledText>

        <View>
          <StyledText style={styles.textDescription}>{description}</StyledText>
        </View>
      </View>
      <View style={styles.practiceItemBottomBar}>
        <View style={styles.iconContainer}>
          <View style={styles.iconGroup}>
            {[...Array(5)].map((item, index) => (
              <PressableIcon
                key={index}
                icon="star"
                size={20}
                color={index <= isRated ? "#FF9529" : "black"}
                onPress={() => {
                  setIsRated(index);
                }}
              />
            ))}
          </View>
          <View style={styles.iconGroup}>
            <PressableIcon
              icon="trash-alt"
              size={20}
              color="black"
              onPress={() => deleteItemHandler(id)}
            />
            <PressableIcon
              icon="edit"
              size={20}
              color="black"
              onPress={editItemHandler}
            />
          </View>
        </View>

        <View style={styles.bottomBarTextContainer}>
          <StyledText>{ratingAverage} average</StyledText>
          <StyledText style={styles.dateText}>{date}</StyledText>
        </View>
        {isRated >= 0 && (
          <View style={styles.ratingButtonsContainer}>
            <Button
              style={styles.ratingsBtn}
              textSize={12}
              onPress={() => submitRatings(isRated + 1)}
            >
              Submit Rating
            </Button>
          </View>
        )}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  practiceItemWrapper: {
    paddingVertical: 5,
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#6f6f6f",
  },
  practiceItemMiddleBar: {
    padding: 12,
    marginTop: 20,
    marginBottom: 10,
    backgroundColor: "#7ca4ef",
    borderTopLeftRadius: 30,
    borderBottomRightRadius: 30,
  },

  practiceItemDetailsItem: {
    flexDirection: "row",
  },
  text: {
    fontSize: 16,
    marginLeft: 4,
    color: "white",
  },
  textTitle: {
    textAlign: "center",
    fontSize: 20,
    marginVertical: 8,
    color: "white",
  },
  textDescription: {
    textAlign: "center",
    fontSize: 16,
    color: "white",
  },
  practiceDetailAndIcons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  iconGroup: {
    flexDirection: "row",
  },
  pressed: {
    opacity: 0.7,
  },
  profilePic: {
    height: 50,
    width: 50,
    borderRadius: 25,
  },

  practiceItemTopBar: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
    marginTop: 10,
  },
  practiceItemBottomBar: {
    justifyContent: "center",
    marginLeft: 10,
  },
  practiceItemAuthor: {
    fontSize: 18,
    marginLeft: 10,
  },
  dateText: {
    color: "#6f6f6f",
  },
  rated: {
    backgroundColor: "yellow",
  },
  ratingButtonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  ratingsBtn: {
    width: 100,
    borderWidth: 1,
    borderRadius: 20,
    marginTop: 10,
    marginHorizontal: 2,
  },
});

export default PracticeItem;
