import React, { useMemo, useEffect } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { parseISO, format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import { signOut } from '~/store/modules/auth/actions';

import Avatar from '~/components/Avatar';
import Background from '~/components/Background';

import { Container, Label, Text, LogoutButton, PersonalData } from './styles';

import { statusBarConfig } from '~/store/modules/user/actions';

export default function Profile() {
  const deliveryman = useSelector(state => state.user.profile);
  const statusBarBG = useSelector(state => state.user.backgroundColor);

  const dispatch = useDispatch();

  const focus = useIsFocused();

  const formattedDate = useMemo(
    () =>
      deliveryman
        ? format(parseISO(deliveryman?.createdAt), "dd/MM/yyyy 'às' HH:mm", {
            locale: ptBR,
          })
        : null,

    [deliveryman]
  );

  useEffect(() => {
    if (focus) {
      if (statusBarBG !== '#fff')
        dispatch(statusBarConfig('#fff', 'dark-content'));
    }
  }, [dispatch, focus, statusBarBG]);

  return (
    <Background>
      <Container>
        <Avatar url={deliveryman?.avatar?.url}>{deliveryman?.name}</Avatar>
        <PersonalData>
          <Label>Nome completo</Label>
          <Text>{deliveryman?.name}</Text>
          <Label>E-mail</Label>
          <Text>{deliveryman?.email}</Text>
          <Label>Data de cadastro</Label>
          <Text>{formattedDate}</Text>
        </PersonalData>

        <LogoutButton onPress={() => dispatch(signOut())}>Logout</LogoutButton>
      </Container>
    </Background>
  );
}
