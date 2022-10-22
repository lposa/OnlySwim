import {Text, StyleSheet} from 'react-native';
import {useEffect, useCallback} from 'react';
import {useFonts} from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

const StyledText = ({children, isHeaderText, style, isMainText}) => {
  const [fontsLoaded] = useFonts({
    'Jost-200-Thin': require('../../assets/fonts/Jost-200-Thin.ttf'),
    'Jost-300-Light': require('../../assets/fonts/Jost-300-Light.ttf'),
    'Jost-400-Book': require('../../assets/fonts/Jost-400-Book.ttf'),
    'Jost-500-Medium': require('../../assets/fonts/Jost-500-Medium.ttf'),
    'Jost-700-Bold': require('../../assets/fonts/Jost-700-Bold.ttf'),
    'Jost-800-Heavy': require('../../assets/fonts/Jost-800-Heavy.ttf'),
    'Jost-900-Black': require('../../assets/fonts/Jost-900-Black.ttf'),
  });

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Text
      onLayout={onLayoutRootView}
      style={[
        style,
        styles.buttonText,
        isHeaderText && styles.headerText,
        isMainText && styles.mainText,
      ]}>
      {children}
    </Text>
  );
};
const styles = StyleSheet.create({
  headerText: {
    fontFamily: 'Jost-900-Black',
  },
  buttonText: {
    fontFamily: 'Jost-500-Medium',
  },
  mainText: {
    fontFamily: 'Jost-700-Bold',
  },
});

export default StyledText;
