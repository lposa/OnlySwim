import {View, Image, StyleSheet} from 'react-native';
import {useContext} from 'react';
import {Styles} from '../../constants/styles';
import PressableIcon from './PressableIcon';
import {PracticesContext} from '../../store/practices-context';
import StyledText from './StyledText';

const Header = ({children}) => {
  const practicesCtx = useContext(PracticesContext);

  return (
    <View style={styles.headerContainer}>
      <View style={styles.header}>
        <Image source={require('../../assets/logo.png')} style={styles.logo} />

        <StyledText isHeaderText style={styles.title}>
          {children}
        </StyledText>
      </View>
      <View style={styles.headerLogoutIcon}>
        <PressableIcon
          icon="logout"
          size={26}
          color="black"
          isAntIcon
          style={styles.logoutIcon}
          onPress={practicesCtx.logout}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    backgroundColor: Styles.colors.babyBlue,
    elevation: 4,
  },
  header: {
    flexDirection: 'row',
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 30,
    color: 'black',
  },
  logo: {
    width: 75,
    height: 75,
    borderWidth: 2,
    marginLeft: 10,
    marginRight: 20,
  },
  headerLogoutIcon: {
    flexDirection: 'row',
    marginRight: 10,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Header;
