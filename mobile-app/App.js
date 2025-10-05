import React, {useEffect, useState} from 'react';
import {
  StatusBar,
  StyleSheet,
  View,
  Alert,
  BackHandler,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Provider as PaperProvider} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PushNotification from 'react-native-push-notification';

// Import screens
import SplashScreen from './src/screens/SplashScreen';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import HomeScreen from './src/screens/HomeScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import DashboardScreen from './src/screens/DashboardScreen';
import PersonalTrainerScreen from './src/screens/PersonalTrainerScreen';
import ChatScreen from './src/screens/ChatScreen';
import WorkoutScreen from './src/screens/WorkoutScreen';
import MealScreen from './src/screens/MealScreen';

// Import context
import {AuthProvider, useAuth} from './src/context/AuthContext';
import {ThemeProvider} from './src/context/ThemeContext';

const Stack = createStackNavigator();

// Configure push notifications
PushNotification.configure({
  onRegister: function (token) {
    console.log('TOKEN:', token);
  },
  onNotification: function (notification) {
    console.log('NOTIFICATION:', notification);
  },
  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },
  popInitialNotification: true,
  requestPermissions: true,
});

const AppNavigator = () => {
  const {isAuthenticated, isLoading} = useAuth();

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          gestureEnabled: true,
          cardStyleInterpolator: ({current, layouts}) => {
            return {
              cardStyle: {
                transform: [
                  {
                    translateX: current.progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [layouts.screen.width, 0],
                    }),
                  },
                ],
              },
            };
          },
        }}>
        {!isAuthenticated ? (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="Dashboard" component={DashboardScreen} />
            <Stack.Screen name="PersonalTrainer" component={PersonalTrainerScreen} />
            <Stack.Screen name="Chat" component={ChatScreen} />
            <Stack.Screen name="Workout" component={WorkoutScreen} />
            <Stack.Screen name="Meal" component={MealScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const App = () => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const prepare = async () => {
      try {
        // Initialize app
        await new Promise(resolve => setTimeout(resolve, 2000));
        setIsReady(true);
      } catch (e) {
        console.warn(e);
      }
    };

    prepare();

    // Handle back button on Android
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      Alert.alert(
        'Exit App',
        'Are you sure you want to exit?',
        [
          {text: 'Cancel', style: 'cancel'},
          {text: 'Exit', onPress: () => BackHandler.exitApp()},
        ],
      );
      return true;
    });

    return () => backHandler.remove();
  }, []);

  if (!isReady) {
    return <SplashScreen />;
  }

  return (
    <ThemeProvider>
      <AuthProvider>
        <PaperProvider>
          <StatusBar barStyle="light-content" backgroundColor="#667eea" />
          <AppNavigator />
        </PaperProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
