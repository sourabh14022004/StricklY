import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import 'react-native-gesture-handler';
import WelcomeScreen from './src/components/WelcomeScreen';
import LoginScreen from './src/components/LoginScreen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('welcome');

  const navigateToLogin = () => {
    setCurrentScreen('login');
  };

  const navigateToWelcome = () => {
    setCurrentScreen('welcome');
  };

  return (
    <>
      <StatusBar style="auto" />
      {currentScreen === 'welcome' ? (
        <WelcomeScreen navigation={{ navigate: navigateToLogin }} />
      ) : (
        <LoginScreen navigation={{ navigate: navigateToWelcome }} />
      )}
    </>
  );
}
