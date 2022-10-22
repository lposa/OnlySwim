import {View, StyleSheet} from 'react-native';
import StyledText from '../UI/StyledText';

const AboutMe = ({userInfo}) => {
  return (
    <View style={styles.root}>
      <View style={styles.labelWrapper}>
        <View style={styles.labelContainer}>
          <StyledText isMainText style={styles.labelField}>
            E-mail:
          </StyledText>
          <StyledText style={styles.labelStyledText}>
            {userInfo?.email}
          </StyledText>
        </View>
        <View style={styles.labelContainer}>
          <StyledText isMainText style={styles.labelField}>
            Phone:
          </StyledText>
          <StyledText style={styles.labelStyledText}>
            {userInfo?.phone}
          </StyledText>
        </View>
        <View style={styles.labelContainer}>
          <StyledText isMainText style={styles.labelField}>
            Role:
          </StyledText>
          <StyledText style={styles.labelStyledText}>
            {userInfo?.role}
          </StyledText>
        </View>
        <View style={styles.labelContainer}>
          <StyledText isMainText style={styles.labelField}>
            Birthday:
          </StyledText>
          <StyledText style={styles.labelStyledText}>
            {userInfo?.birthday}
          </StyledText>
        </View>
      </View>
      <View style={styles.descriptionWrapper}>
        <View style={styles.labelContainer}>
          <StyledText style={styles.labelStyledText}>
            {userInfo?.description}
          </StyledText>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    marginTop: 20,
    padding: 10,
    overflow: 'hidden',
  },
  labelWrapper: {
    alignItems: 'center',
    padding: 10,
    borderRadius: 4,
    borderWidth: 1,
  },
  labelContainer: {
    flexDirection: 'row',
    marginVertical: 5,
    alignItems: 'center',
    minWidth: 300,
  },
  labelField: {
    marginRight: 10,
    fontSize: 16,
  },
  labelStyledText: {
    fontSize: 16,
    StyledTextAlign: 'center',
  },
  descriptionWrapper: {
    marginTop: 20,
  },
});

export default AboutMe;
