import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { parseISO, format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import { signOut } from '~/store/modules/auth/actions';

import Avatar from '~/components/Avatar';
import Background from '~/components/Background';

import { Container, Label, Text, LogoutButton, PersonalData } from './styles';

export default function Profile() {
  const deliveryman = useSelector(state => state.user.profile);
  const formattedDate = useMemo(
    () =>
      deliveryman
        ? format(parseISO(deliveryman?.createdAt), "dd/MM/yyyy 'às' HH:mm", {
            locale: ptBR,
          })
        : null,

    [deliveryman]
  );

  const dispatch = useDispatch();

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
