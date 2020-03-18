import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import SignIn from '~/pages/SignIn';

export default function Routes() {
  const NavStack = createStackNavigator();
  return (
    <NavigationContainer>
      <NavStack.Navigator initialRouteName="SignIn">
        <NavStack.Screen name="SignIn" component={SignIn} />
      </NavStack.Navigator>
    </NavigationContainer>
  );
}
