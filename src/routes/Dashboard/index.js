import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Deliveries from '~/pages/Deliveries';
import Profile from '~/pages/Profile';

export default function Dashboard() {
  const NavBottom = createBottomTabNavigator();
  function navIcon(iconName) {
    const icon = ({ color }) => (
      <Icon name={iconName} size={38} color={color} />
    );

    icon.propTypes = {
      color: PropTypes.string.isRequired,
    };
    return icon;
  }
  return (
    <NavBottom.Navigator
      initialRouteName="Deliveries"
      tabBarOptions={{
        keyboardHidesTabBar: true,
        activeTintColor: '#7D40E7',
        inactiveTintColor: '#999',
        style: {
          borderTopWidth: 1,
          backgroundColor: '#ffff',
          height: 70,
        },
      }}
    >
      <NavBottom.Screen
        name="Deliveries"
        component={Deliveries}
        options={{
          tabBarLabel: 'Entregas',
          tabBarIcon: navIcon('reorder'),
        }}
      />
      <NavBottom.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Meu Perfil',
          tabBarIcon: navIcon('account-circle'),
        }}
      />
    </NavBottom.Navigator>
  );
}
