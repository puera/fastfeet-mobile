import React, { useEffect, useState, useCallback } from 'react';
import { Alert, BackHandler, View, ActivityIndicator } from 'react-native';
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
  TextContainer,
  TextEmptyMenu,
} from './styles';

import { signOut } from '~/store/modules/auth/actions';
import { statusBarConfig } from '~/store/modules/user/actions';

export default function Delivery({ navigation: { navigate } }) {
  const [loading, setLoading] = useState(false);
  const [pagePedding, setPagePedding] = useState(1);
  const [pageDelivered, setPageDelivered] = useState(1);
  const dispatch = useDispatch();
  const profile = useSelector(state => state.user.profile);
  const statusBarBG = useSelector(state => state.user.backgroundColor);
  const [selectedPeding, setSelectedPeding] = useState(true);
  const [selectedDelivered, setSelectedDelivered] = useState(false);
  const [totalPages, setTotalPages] = useState();
  const focus = useIsFocused();

  const [deliveries, setDeliveries] = useState([]);
  const [delivereds, setDelivereds] = useState([]);

  const loadDeliveries = useCallback(
    async function loadDeliveries() {
      setLoading(true);
      const response = await api.get(
        `deliveryman/${profile?.id}/list?page=${pagePedding}`
      );
      setLoading(false);
      setDeliveries(d =>
        pagePedding > 1
          ? [...d, ...response.data.deliveries]
          : response.data.deliveries
      );
      setTotalPages(Math.ceil(response.data.count / 5));
    },
    [profile, pagePedding]
  );

  const loadDelivered = useCallback(
    async function loadDelivered() {
      setLoading(true);
      const response = await api.get(
        `deliveryman/${profile?.id}/deliveries?page=${pageDelivered}`
      );
      setLoading(false);
      setDelivereds(d =>
        pageDelivered > 1
          ? [...d, ...response.data.deliveries]
          : response.data.deliveries
      );
      setTotalPages(Math.ceil(response.data.count / 5));
    },

    [profile, pageDelivered]
  );

  const loadMore = useCallback(
    function load(pageToLoad) {
      if (pageToLoad) {
        if (pagePedding < totalPages) setPagePedding(pagePedding + 1);
      } else if (pageDelivered < totalPages)
        setPageDelivered(pageDelivered + 1);
    },

    [pageDelivered, pagePedding, totalPages]
  );

  useEffect(() => {
    if (!focus) {
      setDeliveries([]);
      setPagePedding(1);
      setDelivereds([]);
      setPageDelivered(1);
    }
    if (focus) {
      if (selectedPeding) loadDeliveries();
      if (selectedDelivered) loadDelivered();
      if (statusBarBG !== '#fff')
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
  }, [
    dispatch,
    focus,
    selectedPeding,
    selectedDelivered,
    loadDelivered,
    loadDeliveries,
    statusBarBG,
  ]);

  async function handlePeding() {
    if (selectedPeding) return;
    setSelectedDelivered(false);
    setSelectedPeding(true);
    if (selectedDelivered) {
      setDeliveries([]);
      setPagePedding(1);
    }
  }

  async function handleDelivered() {
    if (selectedDelivered) return;
    setSelectedDelivered(true);
    setSelectedPeding(false);
    if (selectedPeding) {
      setDelivereds([]);
      setPageDelivered(1);
    }
  }

  function renderFooter() {
    if (!loading) return null;
    return (
      <View>
        <ActivityIndicator color="#7159c1" size="small" />
      </View>
    );
  }

  function renderProfile() {
    return <Header profile={profile} />;
  }

  function renderEmpty() {
    return (
      <TextContainer>
        <TextEmptyMenu>
          Nenhum dado a ser mostrado aguarde o carregamento ...
        </TextEmptyMenu>
      </TextContainer>
    );
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
        <List
          ListEmptyComponent={renderEmpty}
          ListFooterComponent={renderFooter}
          onEndReachedThreshold={0.1}
          onEndReached={() => loadMore(selectedPeding)}
          data={selectedPeding ? deliveries : delivereds}
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
      </>
    );
  }

  return (
    <Background>
      <Container>
        {renderProfile()}
        {renderList()}
      </Container>
    </Background>
  );
}

Delivery.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
