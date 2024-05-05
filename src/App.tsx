import React from 'react';
import {SafeAreaView} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import Router from './routes';

const App = () => {
  return (
    <NavigationContainer>
      <SafeAreaView />
      <Router />
    </NavigationContainer>
  );
};

export default App;
