import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Deliveries from '~/pages/Deliveries';

export default function DeliveriesNav() {
  const StackNav = createStackNavigator();
  return (
    <StackNav.Navigator headerMode="none" initialRouteName="DeliveriesStack">
      <StackNav.Screen name="DeliveriesStack" component={Deliveries} />
    </StackNav.Navigator>
  );
}
