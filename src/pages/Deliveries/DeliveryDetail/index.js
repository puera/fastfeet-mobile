import React, { useEffect, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useIsFocused } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { parseISO, format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import { statusBarConfig } from '~/store/modules/user/actions';

import Background from '~/components/Background';
import {
  Container,
  ContainerDelivery,
  DeliveryHeader,
  TextHeaderDelivery,
  TextHeader,
  TextDelivery,
  RecipientContainer,
  DateContainer,
  Date,
  ContainerSituation,
  ContainerEffect,
  ButtomGroup,
  ButtomContainer,
  ButtonText,
  BorderButtom,
} from './styles';

export default function DeliveryDetail({ route }) {
  const { delivery } = route.params;
  const focus = useIsFocused();
  const dispatch = useDispatch();

  const statusFormatted = useMemo(() => {
    switch (delivery.status) {
      case 'out': {
        return 'Retirado';
      }
      case 'waiting': {
        return 'Pendente';
      }
      case 'delivered': {
        return 'Entregue';
      }
      case 'canceled': {
        return 'Cancelado';
      }
      default:
    }
  }, [delivery.status]);

  const dateFormatted = useCallback(function date(dateForformat) {
    if (!dateForformat) {
      return '- -/- -/- -';
    }
    return format(parseISO(dateForformat), 'dd/MM/yyyy', {
      locale: ptBR,
    });
  }, []);

  useEffect(() => {
    if (focus) dispatch(statusBarConfig('#7D40E7', 'light-content'));
  }, [focus, dispatch]);

  return (
    <Background>
      <Container>
        <ContainerEffect />
        <ContainerDelivery>
          <DeliveryHeader>
            <Icon name="local-shipping" color="#7D40E7" size={20} />
            <TextHeaderDelivery>Informações da entrega</TextHeaderDelivery>
          </DeliveryHeader>
          <RecipientContainer>
            <TextHeader>DESTINATÁRIO</TextHeader>
            <TextDelivery>{delivery.recipient.name}</TextDelivery>
          </RecipientContainer>
          <RecipientContainer>
            <TextHeader>ENDEREÇO DE ENTREGA</TextHeader>
            <TextDelivery>
              {delivery.recipient.street}, {delivery.recipient.number},{' '}
              {delivery.recipient.complement}, {delivery.recipient.city} -{' '}
              {delivery.recipient.state}, {delivery.recipient.zip}
            </TextDelivery>
          </RecipientContainer>
          <RecipientContainer>
            <TextHeader>PRODUTO</TextHeader>
            <TextDelivery>{delivery.product}</TextDelivery>
          </RecipientContainer>
        </ContainerDelivery>
        <ContainerSituation>
          <DeliveryHeader>
            <Icon name="event" color="#7D40E7" size={20} />
            <TextHeaderDelivery>Situação da entrega</TextHeaderDelivery>
          </DeliveryHeader>
          <RecipientContainer>
            <TextHeader>STATUS</TextHeader>
            <TextDelivery>{statusFormatted}</TextDelivery>
          </RecipientContainer>
          <DateContainer>
            <RecipientContainer>
              <TextHeader>DATA DE RETIRADA</TextHeader>
              <TextDelivery>{dateFormatted(delivery.start_date)}</TextDelivery>
            </RecipientContainer>
            <Date>
              <TextHeader>DATA DE ENTREGA</TextHeader>
              <TextDelivery>{dateFormatted(delivery.end_date)}</TextDelivery>
            </Date>
          </DateContainer>
        </ContainerSituation>
        <ButtomGroup>
          <ButtomContainer>
            <Icon name="highlight-off" color="#E74040" size={20} />
            <ButtonText>Informar</ButtonText>
            <ButtonText>Problema</ButtonText>
          </ButtomContainer>
          <BorderButtom />
          <ButtomContainer>
            <Icon name="info-outline" color="#E7BA40" size={20} />
            <ButtonText>Visualizar</ButtonText>
            <ButtonText>Problemas</ButtonText>
          </ButtomContainer>
          <BorderButtom />
          <ButtomContainer>
            <Icon name="alarm-on" color="#7D40E7" size={20} />
            <ButtonText>Confirmar</ButtonText>
            <ButtonText>Entrega</ButtonText>
          </ButtomContainer>
        </ButtomGroup>
      </Container>
    </Background>
  );
}

DeliveryDetail.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      delivery: PropTypes.shape({
        status: PropTypes.string,
        product: PropTypes.string,
        start_date: PropTypes.string,
        end_date: PropTypes.string,
        recipient: PropTypes.shape({
          name: PropTypes.string,
          street: PropTypes.string,
          number: PropTypes.string,
          complement: PropTypes.string,
          city: PropTypes.string,
          state: PropTypes.string,
          zip: PropTypes.string,
        }),
      }),
    }),
  }).isRequired,
};
