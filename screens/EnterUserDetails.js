import {View, StyleSheet} from 'react-native';
import {useState, useContext} from 'react';
import UserDetailsForm from '../components/form/UserDetailsForm';
import {Styles} from '../constants/styles';
import StyledText from '../components/UI/StyledText';
import {PracticesContext} from '../store/practices-context';
import {updateUser} from '../util/httpRequests';

const EnterUserDetails = ({route, navigation}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState();
  const userEmail = route.params?.userEmail;
  const userID = route.params?.userId;

  const practicesCtx = useContext(PracticesContext);

  const onSubmit = async userData => {
    setIsSubmitting(true);
    try {
      practicesCtx.updateUser(userEmail, userData);
      await updateUser(userID, userData);

      navigation.navigate('PracticesOverview');
    } catch (error) {
      setError('Could not save data - please try again later!');
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <View style={styles.logoContainer}>
        <StyledText style={styles.logoText}>Finish signup!</StyledText>
      </View>
      <UserDetailsForm userEmail={userEmail} onSubmit={onSubmit} />
    </>
  );
};

const styles = StyleSheet.create({
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 30,

    borderBottomWidth: 1,
    padding: 10,
    borderBottomColor: Styles.colors.darkBlue,
  },

  logoText: {
    fontSize: 24,
  },
});

export default EnterUserDetails;
