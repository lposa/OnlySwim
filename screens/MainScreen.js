import { useContext, useEffect, useState } from "react";

import Header from "../components/UI/Header";
import PracticeList from "../components/practice/PracticeList";
import { PracticesContext } from "../store/practices-context";
import ErrorOverlay from "../components/UI/ErrorOverlay";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import { fetchPractices } from "../util/httpRequests";
import AsyncStorage from "@react-native-async-storage/async-storage";

const MainScreen = () => {
  const practiceCtx = useContext(PracticesContext);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState();
  const [loggedUserEmail, setLoggedUserEmail] = useState();
  const practicesCtx = useContext(PracticesContext);

  useEffect(() => {
    getPractices();

    getLoggedUserEmail();

    console.log("Coming from main screen: ", practiceCtx.practices);
  }, []);

  const getLoggedUserEmail = async () => {
    setLoggedUserEmail(await AsyncStorage.getItem("userEmail"));
  };

  const getPractices = async () => {
    setIsFetching(true);
    try {
      const practices = await fetchPractices();
      practiceCtx.setPractice(practices);
    } catch (error) {
      console.log(error);
      setError("Could not fetch practices!");
    }

    setIsFetching(false);
  };

  const errorHandler = () => {
    setError(null);
  };

  if (error && !isFetching) {
    return <ErrorOverlay message={error} onConfirm={errorHandler} />;
  }

  if (isFetching) {
    return <LoadingOverlay />;
  }

  return (
    <>
      <Header>Practices</Header>

      <PracticeList practices={practiceCtx.practices} />
    </>
  );
};

export default MainScreen;
