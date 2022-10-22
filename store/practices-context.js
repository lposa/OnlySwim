import { createContext, useReducer, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const PracticesContext = createContext({
  practices: [],
  userInfo: [],
  addUser: ({
    email,
    fullName,
    birthday,
    phone,
    role,
    description,
    profilePic,
  }) => {},
  updateUser: ({
    email,
    fullName,
    birthday,
    phone,
    role,
    description,
    profilePic,
  }) => {},
  addPractice: ({ title, date, description, author, ratings }) => {},
  setPractices: (practices) => {},
  updateRatingsList: ({ id, practiceRating }) => {},
  updateCumulativeRating: ({ id, practiceRating }) => {},
  deleteRating: (email) => {},
  addFavorite: (id) => {},
  removeFavorite: (id) => {},
  deletePractice: ({ id }) => {},
  updatePractice: ({ id, title, date, description, author, rating }) => {},
  token: "",
  isAuthenticated: false,
  authenticate: (token) => {},
  logout: () => {},
  getUserID: ({ email: email }) => {},
});

const practicesReducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      console.log("Ctx says: ", action.payload, state);
      return [action.payload, ...state];
    case "SET":
      return action.payload;
    case "UPDATE":
      const practiceIndexToUpdate = state.findIndex(
        (practice) => practice.id === action.payload.id
      );
      const practiceToUpdate = state[practiceIndexToUpdate];
      const updatedItem = { ...practiceToUpdate, ...action.payload.data };
      const updatedPractice = [...state];
      updatedPractice[practiceIndexToUpdate] = updatedItem;
      return updatedPractice;
    case "DELETE":
      return state.filter((practice) => practice.id !== action.payload);
    case "UPDATE RATINGS LIST":
      const practiceIndex = state.findIndex(
        (practice) => practice.id === action.payload.id
      );
      const updatedPracticeLikes = [...state];
      updatedPracticeLikes[practiceIndex].ratings.push(action.payload.data);

      return updatedPracticeLikes;
    case "DELETE RATING":
      return state.ratings.filter((rating) => rating.email !== action.payload);
    case "UPDATE CUMULATIVE RATING":
      const ratingIndex = state.findIndex(
        (practice) => practice.id === action.payload.id
      );
      const updatedRatings = [...state];
      updatedRatings[ratingIndex].cumulativeRating = action.payload.data;
      console.log("Cumulative", updatedRatings[ratingIndex].cumulativeRating);
      return updatedRatings;
    default:
      return state;
  }
};

const userReducer = (state, action) => {
  switch (action.type) {
    case "ADD USER":
      return [action.payload, ...state];
    case "UPDATE USER":
      const userIndexToUpdate = state.findIndex(
        (user) => user.email === action.payload.email
      );
      const userToUpdate = state[userIndexToUpdate];
      const updatedUserItem = { ...userToUpdate, ...action.payload.data };
      const updatedUser = [...state];
      updatedUser[userIndexToUpdate] = updatedUserItem;
      return updatedUser;
    case "GET USER ID":
      const foundUserIndex = state.findIndex(
        (user) => user.email === action.payload.email
      );

      const foundUser = state[foundUserIndex];

      return foundUser;
    default:
      return state;
  }
};

const PracticesContextProvider = ({ children }) => {
  const [practicesState, dispatch] = useReducer(practicesReducer, []);
  const [userState, userDispatch] = useReducer(userReducer, []);

  const addPractice = (practiceData) => {
    dispatch({ type: "ADD", payload: practiceData });
  };

  const setPractice = (practices) => {
    dispatch({ type: "SET", payload: practices });
  };

  const deletePractice = (id) => {
    dispatch({ type: "DELETE", payload: id });
  };
  const updatePractice = (id, practiceData) => {
    dispatch({ type: "UPDATE", payload: { id: id, data: practiceData } });
  };

  const updateRatingsList = (id, ratings) => {
    dispatch({
      type: "UPDATE RATINGS LIST",
      payload: { id: id, data: ratings },
    });
  };

  const updateCumulativeRating = (id, rating) => {
    dispatch({
      type: "UPDATE CUMULATIVE RATING",
      payload: { id: id, data: rating },
    });
  };

  const deleteRating = (email) => {
    dispatch({ type: "DELETE RATING", payload: email });
  };
  const addUser = (userData) => {
    userDispatch({ type: "ADD USER", payload: userData });
  };

  const updateUser = (email, userData) => {
    userDispatch({
      type: "UPDATE USER",
      payload: { email: email, data: userData },
    });
  };

  const getUserID = (email) => {
    userDispatch({ type: "GET USER ID", email: email });
  };

  const [authToken, setAuthToken] = useState();

  function authenticate(token) {
    setAuthToken(token);
    AsyncStorage.setItem("token", token);
  }

  function logout() {
    setAuthToken(null);
    AsyncStorage.removeItem("token");
    AsyncStorage.removeItem("userID");
  }

  const value = {
    practices: practicesState,
    userInfo: userState,
    addPractice: addPractice,
    setPractice: setPractice,
    deletePractice: deletePractice,
    updatePractice: updatePractice,
    updateRatingsList: updateRatingsList,
    deleteRating: deleteRating,
    updateCumulativeRating: updateCumulativeRating,
    token: authToken,
    isAuthenticated: !!authToken, //converts to true or false
    authenticate: authenticate,
    logout: logout,
    addUser: addUser,
    updateUser: updateUser,
    getUserID: getUserID,
  };

  return (
    <PracticesContext.Provider value={value}>
      {children}
    </PracticesContext.Provider>
  );
};

export default PracticesContextProvider;
