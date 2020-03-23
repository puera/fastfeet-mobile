import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Deliveries from '~/pages/Deliveries';
import DeliveryDetail from '~/pages/Deliveries/DeliveryDetail';
import ConfirmDelivery from '~/pages/Deliveries/ConfirmDelivery';

import InfoProblem from '~/pages/Problem/InfoProblem';
import Problem from '~/pages/Problem';

export default function DeliveriesNav({ navigation: { navigate } }) {
  const StackNav = createStackNavigator();
  return (
    <StackNav.Navigator
      screenOptions={{
        headerTintColor: '#fff',
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#7D40E7',
          shadowOpacity: 0,
          shadowOffset: {
            height: 0,
          },
          shadowRadius: 0,
          elevation: 0,
        },
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
              <Icon name="chevron-left" size={20} color="#fff" />
            </TouchableOpacity>
          ),
        }}
      />
      <StackNav.Screen
        name="InfoProblem"
        component={InfoProblem}
        options={{
          title: 'Informar problema',
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigate('DeliveryDetail')}>
              <Icon name="chevron-left" size={20} color="#fff" />
            </TouchableOpacity>
          ),
        }}
      />
      <StackNav.Screen
        name="Problem"
        component={Problem}
        options={{
          title: 'Visualizar problemas',
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigate('DeliveryDetail')}>
              <Icon name="chevron-left" size={20} color="#fff" />
            </TouchableOpacity>
          ),
        }}
      />
      <StackNav.Screen
        name="ConfirmDelivery"
        component={ConfirmDelivery}
        options={{
          title: 'Confirmar Entrega',
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigate('DeliveryDetail')}>
              <Icon name="chevron-left" size={20} color="#fff" />
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
