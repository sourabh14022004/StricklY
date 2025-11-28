import React, { useState } from 'react';
import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider, SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
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
  const insets = useSafeAreaInsets();

  const navigateToLogin = () => {
    setCurrentScreen('login');
  };

  const navigateToWelcome = () => {
    setCurrentScreen('welcome');
  };

  const navigateToSignUp = () => {
    setCurrentScreen('signup');
  };

  const isAuthScreen = !user && (currentScreen === 'welcome' || currentScreen === 'login' || currentScreen === 'signup');

  // Show loading modal while checking authentication or during auth operations
  if (isAuthScreen) {
    // Use SafeAreaView for auth screens (welcome, login, signup)
    return (
      <SafeAreaView style={{ flex: 1 }} edges={['top', 'bottom', 'left', 'right']}>
        <NavigationContainer>
          <StatusBar style="auto" />
          <LoadingModal visible={loading} message="Please wait..." />
          {!loading && (
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
        </NavigationContainer>
      </SafeAreaView>
    );
  }

  // Use custom colored safe areas for main app
  return (
    <View style={{ flex: 1 }}>
      {/* Top safe area with custom color */}
      <View style={{ height: insets.top, backgroundColor: '#1A0B2E' }} />
      
      {/* Left and right safe areas */}
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <View style={{ width: insets.left, backgroundColor: '#1A0B2E' }} />
        
        <View style={{ flex: 1 }}>
          <NavigationContainer>
            <StatusBar style="auto" />
            <LoadingModal visible={loading} message="Please wait..." />
            {!loading && (
              <>
                {/* If user is authenticated, show main app */}
                {user && <MainAppScreen />}
              </>
            )}
          </NavigationContainer>
        </View>
        
        <View style={{ width: insets.right, backgroundColor: '#1A0B2E' }} />
      </View>
      
      {/* Bottom safe area with different color */}
      <View style={{ height: insets.bottom, backgroundColor: '#000000' }} />
    </View>
  );

}

export default function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </SafeAreaProvider>
  );
}

