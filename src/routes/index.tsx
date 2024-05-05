import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {ScanDevice} from '../screens';
import {RootStackParamList} from '../types/routes';

const Stack = createStackNavigator<RootStackParamList>();

const Router = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: 'white',
        },
      }}>
      <Stack.Screen name="ScanDevice" component={ScanDevice} />
    </Stack.Navigator>
  );
};

export default Router;
