import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Deliveries from '~/pages/Deliveries';
import DeliveryDetail from '~/pages/Deliveries/DeliveryDetail';

export default function DeliveriesNav({ navigation: { navigate } }) {
  const StackNav = createStackNavigator();
  return (
    <StackNav.Navigator
      screenOptions={{
        headerTransparent: true,
        headerTintColor: '#7159c1',
        headerTitleAlign: 'center',
      }}
      headerMode="screen"
      initialRouteName="DeliveriesStack"
    >
      <StackNav.Screen
        name="DeliveriesStack"
        component={Deliveries}
        options={{ headerShown: false }}
      />
      <StackNav.Screen
        name="DeliveryDetail"
        component={DeliveryDetail}
        options={{
          title: 'Detalhes da Encomenda',
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigate('DeliveriesStack')}>
              <Icon name="chevron-left" size={20} color="#7159c1" />
            </TouchableOpacity>
          ),
        }}
      />
    </StackNav.Navigator>
  );
}

DeliveriesNav.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
