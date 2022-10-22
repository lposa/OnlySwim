import {StatusBar} from 'expo-status-bar';

import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AppLoading from 'expo-app-loading';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {FontAwesome5} from '@expo/vector-icons';
import {useState, useContext, useEffect} from 'react';
import MainScreen from './screens/MainScreen';
import AddPractice from './screens/AddPractice';
import MyProfile from './screens/MyProfile';
import {Ionicons} from '@expo/vector-icons';
import {Styles} from './constants/styles';
import PracticesContextProvider, {
  PracticesContext,
} from './store/practices-context';
import EditPractice from './screens/EditPractice';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import EnterUserDetails from './screens/EnterUserDetails';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'white',
  },
};

function TabsOverview() {
  return (
    <>
      <StatusBar style="dark" />

      <BottomTabs.Navigator
        screenOptions={({navigation}) => ({
          tabBarStyle: {
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            backgroundColor: Styles.colors.babyBlue,
          },
          headerShown: false,
        })}>
        <BottomTabs.Screen
          name="MainScreen"
          component={MainScreen}
          options={{
            title: 'Practice Feed',
            tabBarLabel: 'Feed',
            tabBarLabelStyle: {fontSize: 12},
            tabBarInactiveTintColor: Styles.colors.darkBlue,
            tabBarActiveTintColor: Styles.colors.mainBlue,
            tabBarIcon: ({color, size}) => (
              <FontAwesome5 name="swimmer" size={size} color={color} />
            ),
          }}
        />
        <BottomTabs.Screen
          name="AddPractice"
          component={AddPractice}
          options={{
            title: 'Add Practice',
            tabBarLabel: '',
            presentation: 'modal',
            tabBarInactiveTintColor: Styles.colors.darkBlue,
            tabBarActiveTintColor: Styles.colors.mainBlue,
            tabBarIcon: ({color, size}) => (
              <Ionicons
                name="add-circle"
                size={80}
                color={color}
                style={{position: 'absolute'}}
              />
            ),
          }}
        />
        <BottomTabs.Screen
          name="MyProfile"
          component={MyProfile}
          options={{
            title: 'My Profile',
            tabBarLabel: 'Profile',
            tabBarLabelStyle: {fontSize: 12},
            tabBarInactiveTintColor: Styles.colors.darkBlue,
            tabBarActiveTintColor: Styles.colors.mainBlue,
            tabBarIcon: ({color, size}) => (
              <FontAwesome5 name="user-alt" size={size} color={color} />
            ),
          }}
        />
      </BottomTabs.Navigator>
    </>
  );
}

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: 'white',
      }}>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Signup"
        component={SignupScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

function AuthenticatedStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: 'white',
      }}>
      <Stack.Screen
        name="PracticesOverview"
        component={TabsOverview}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="EditPractice"
        component={EditPractice}
        options={{
          title: 'Edit Practice',
          presentation: 'modal',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="EnterUserDetails"
        component={EnterUserDetails}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

function Navigation() {
  const practicesCtx = useContext(PracticesContext);

  return (
    <NavigationContainer theme={MyTheme}>
      {!practicesCtx.isAuthenticated && <AuthStack />}
      {practicesCtx.isAuthenticated && <AuthenticatedStack />}
    </NavigationContainer>
  );
}

function Root() {
  const [isTryingLogin, setIsTryingLogin] = useState(true);
  const practicesCtx = useContext(PracticesContext);

  useEffect(() => {
    async function fetchToken() {
      const storedToken = await AsyncStorage.getItem('token');

      if (storedToken) {
        practicesCtx.authenticate(storedToken);
      }

      setIsTryingLogin(false);
    }
    fetchToken();
  });

  if (isTryingLogin) {
    return <AppLoading />;
  }

  return <Navigation />;
}

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <PracticesContextProvider>
        <SafeAreaProvider>
          <Root />
        </SafeAreaProvider>
      </PracticesContextProvider>
    </>
  );
}
