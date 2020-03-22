import React from 'react';
import { useSelector } from 'react-redux';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { navigationRef } from '~/services/RootNavigation';

import SignIn from '~/pages/SignIn';
import Dashboard from '~/routes/Dashboard';

export default function Routes() {
  const signed = useSelector(state => state.auth.signed);
  const barStyle = useSelector(state => state.user.barStyle);
  const backgroundColor = useSelector(state => state.user.backgroundColor);

  const NavStack = createStackNavigator();
  return (
    <NavigationContainer ref={navigationRef}>
      <StatusBar barStyle={barStyle} backgroundColor={backgroundColor} />

      <NavStack.Navigator
        initialRouteName={signed ? 'Dashboard' : 'SignIn'}
        headerMode="none"
      >
        <NavStack.Screen name="SignIn" component={SignIn} />
        <NavStack.Screen name="Dashboard" component={Dashboard} />
      </NavStack.Navigator>
    </NavigationContainer>
  );
}
