import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider, useAuth } from './src/contexts/AuthContext';
import WelcomeScreen from './src/components/WelcomeScreen';
import LoginScreen from './src/components/LoginScreen';
import SignUpScreen from './src/components/SignUpScreen';
import MainAppScreen from './src/components/MainAppScreen';
import LoadingModal from './src/modals/LoadingModal';

type Screen = 'welcome' | 'login' | 'signup';

function AppContent() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('welcome');
  const { user, loading } = useAuth();

  const navigateToLogin = () => {
    setCurrentScreen('login');
  };

  const navigateToWelcome = () => {
    setCurrentScreen('welcome');
  };

  const navigateToSignUp = () => {
    setCurrentScreen('signup');
  };

  // Show loading modal while checking authentication or during auth operations
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <LoadingModal visible={loading} message="Please wait..." />
      {!loading && (
        <>
          {/* If user is authenticated, show main app */}
          {user ? (
            <MainAppScreen />
          ) : (
            /* If user is not authenticated, show welcome/login/signup screens */
            <>
              {currentScreen === 'welcome' ? (
                <WelcomeScreen navigation={{ navigate: navigateToLogin }} />
              ) : currentScreen === 'login' ? (
                <LoginScreen navigation={{ navigate: (screen: Screen) => {
                  if (screen === 'welcome') navigateToWelcome();
                  else if (screen === 'signup') navigateToSignUp();
                }}} />
              ) : (
                <SignUpScreen navigation={{ navigate: (screen: Screen) => {
                  if (screen === 'login') navigateToLogin();
                  else if (screen === 'welcome') navigateToWelcome();
                }}} />
              )}
            </>
          )}
        </>
      )}
    </NavigationContainer>
  );

}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

