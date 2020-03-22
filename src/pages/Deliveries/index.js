import React, { useEffect, useState, useCallback } from 'react';
import { Alert, BackHandler, ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';
import { useIsFocused } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';

import api from '~/services/api';

import DeliveryItem from '~/components/DeliveryItem';
import Header from '~/components/Header';
import Background from '~/components/Background';

import {
  Container,
  List,
  HeaderList,
  TextList,
  MenuList,
  TextMenu,
  Menu,
} from './styles';

import { signOut } from '~/store/modules/auth/actions';
import { statusBarConfig } from '~/store/modules/user/actions';

export default function Delivery({ navigation: { navigate } }) {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const profile = useSelector(state => state.user.profile);
  const [selectedPeding, setSelectedPeding] = useState(true);
  const [selectedDelivered, setSelectedDelivered] = useState(false);
  const focus = useIsFocused();

  const [deliveries, setDeliveries] = useState([]);

  const loadData = useCallback(
    async function loadDeliveries(status) {
      setLoading(true);
      const response = status
        ? await api.get(`deliveryman/${profile?.id}/list`)
        : await api.get(`deliveryman/${profile?.id}/deliveries`);

      setLoading(false);
      setDeliveries(response.data.deliveries);
    },
    [profile]
  );

  useEffect(() => {
    if (focus) {
      loadData(selectedPeding);
      dispatch(statusBarConfig('#fff', 'dark-content'));
      const backAction = () => {
        Alert.alert('Opa!', 'Deseja realmente deslogar do FastFeet?', [
          {
            text: 'Cancelar',
            onPress: () => null,
          },
          { text: 'Sim', onPress: () => dispatch(signOut()) },
        ]);

        return true;
      };

      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction
      );
      return () => backHandler.remove();
    }
  }, [dispatch, focus, selectedPeding, loadData]);

  function handlePeding() {
    setSelectedPeding(true);
    setSelectedDelivered(false);
    loadData(selectedPeding);
  }

  function handleDelivered() {
    setSelectedPeding(false);
    setSelectedDelivered(true);
    loadData();
  }

  function renderProfile() {
    return <Header profile={profile} />;
  }

  function renderList() {
    return (
      <>
        <HeaderList>
          <TextList>Entregas</TextList>
          <MenuList>
            <Menu onPress={handlePeding}>
              <TextMenu selected={selectedPeding}>Pendentes</TextMenu>
            </Menu>
            <Menu onPress={handleDelivered}>
              <TextMenu selected={selectedDelivered}>Entregues</TextMenu>
            </Menu>
          </MenuList>
        </HeaderList>
        {deliveries.length ? (
          <List
            data={deliveries}
            keyExtractor={item => String(item.id)}
            renderItem={({ item }) => (
              <DeliveryItem
                delivery={item}
                handleSeeDetailsPressed={() =>
                  navigate('DeliveryDetail', {
                    delivery: item,
                  })
                }
              />
            )}
          />
        ) : (
          <TextMenu>Nenhum registro encontrado</TextMenu>
        )}
      </>
    );
  }

  return (
    <Background>
      <Container>
        {renderProfile()}
        {loading ? (
          <ActivityIndicator
            size="large"
            color="#7D40E7"
            style={{ marginTop: 200 }}
          />
        ) : (
          renderList()
        )}
      </Container>
    </Background>
  );
}

Delivery.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
