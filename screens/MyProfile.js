import {View, Image, StyleSheet} from 'react-native';
import {useState, useContext, useEffect} from 'react';
import Header from '../components/UI/Header';
import Button from '../components/UI/Button';
import {Styles} from '../constants/styles';
import AboutMe from '../components/profile/AboutMe';
import PastPractices from '../components/profile/PastPractices';
import FavoritePractices from '../components/profile/FavoritePractices';
import StyledText from '../components/UI/StyledText';
import {PracticesContext} from '../store/practices-context';
import LoadingOverlay from '../components/UI/LoadingOverlay';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {fetchUserById} from '../util/httpRequests';

const MyProfile = () => {
  const [activeTab, setActiveTab] = useState('about');
  const [userInfo, setUserInfo] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const practiceCtx = useContext(PracticesContext);

  useEffect(() => {
    setIsLoading(true);
    try {
      getUserInfo();
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
    setIsLoading(false);
  }, [userInfo]);

  const getUserInfo = async () => {
    const userID = await AsyncStorage.getItem('userID');

    const fetchedUser = await fetchUserById(userID);
    setUserInfo(fetchedUser);
  };

  const toggleActiveTab = id => {
    setActiveTab(id);
  };

  let tab;
  if (activeTab === 'about') {
    tab = <AboutMe userInfo={userInfo} />;
  } else if (activeTab === 'past') {
    tab = <PastPractices />;
  } else if (activeTab === 'favorites') {
    tab = <FavoritePractices />;
  }

  if (isLoading) {
    return <LoadingOverlay />;
  }

  return (
    <>
      <Header>Your profile</Header>
      <View style={styles.root}>
        <View style={styles.profilePicContainer}>
          <Image
            source={
              userInfo.profilePic
                ? require('../assets/profile-pic.png')
                : require('../assets/placeholder.jpg')
            }
            style={styles.profilePic}
          />

          <StyledText isMainText style={styles.text}>
            {userInfo.fullName}
          </StyledText>
        </View>
        <View style={styles.tabButtonContainer}>
          <Button
            style={[
              styles.tabButton,
              activeTab === 'about' && styles.activeTab,
            ]}
            textColor={activeTab === 'about' ? 'white' : 'black'}
            onPress={() => toggleActiveTab('about')}>
            About Me
          </Button>
          <Button
            style={[styles.tabButton, activeTab === 'past' && styles.activeTab]}
            textColor={activeTab === 'past' ? 'white' : 'black'}
            onPress={() => toggleActiveTab('past')}>
            Past Practices
          </Button>
          <Button
            style={[
              styles.tabButton,
              activeTab === 'favorites' && styles.activeTab,
            ]}
            textColor={activeTab === 'favorites' ? 'white' : 'black'}
            onPress={() => toggleActiveTab('favorites')}>
            Favorite Practices
          </Button>
        </View>
        {tab}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  profilePicContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  text: {
    fontSize: 16,
    marginTop: 10,
  },
  tabButtonContainer: {
    flexDirection: 'row',
    marginTop: 20,
    marginHorizontal: 20,
    elevation: 4,
  },
  tabButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: Styles.colors.darkBlue,
    padding: 5,
    marginHorizontal: 5,
    borderRadius: 16,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: Styles.colors.darkBlue,
  },
});

export default MyProfile;
