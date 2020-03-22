import React, { useEffect } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { useDispatch } from 'react-redux';

import { statusBarConfig } from '~/store/modules/user/actions';

import Background from '~/components/Background';
import { Container } from './styles';

export default function DeliveryDetail({ route }) {
  const { delivery } = route.params;
  const focus = useIsFocused();
  const dispatch = useDispatch();

  console.tron.log(delivery);

  useEffect(() => {
    if (focus) dispatch(statusBarConfig('#7D40E7', 'light-content'));
  }, [focus, dispatch]);
  return (
    <Background>
      <Container />
    </Background>
  );
}
