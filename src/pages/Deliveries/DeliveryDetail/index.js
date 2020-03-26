import React, { useEffect, useMemo, useCallback } from 'react';
import { Alert } from 'react-native';
import PropTypes from 'prop-types';
import { useIsFocused } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { parseISO, format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import api from '~/services/api';
import { statusBarConfig } from '~/store/modules/user/actions';

import Background from '~/components/Background';
import ContainerEffect from '~/components/ContainerEffect';

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
  ButtomGroup,
  ButtomContainer,
  ButtonText,
  BorderButtom,
  ConfirmContainer,
} from './styles';

export default function DeliveryDetail({ route, navigation: { navigate } }) {
  const { delivery } = route.params;
  const focus = useIsFocused();
  const dispatch = useDispatch();
  const statusBarBG = useSelector(state => state.user.backgroundColor);

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
    if (focus && statusBarBG !== '#7D40E7') {
      dispatch(statusBarConfig('#7D40E7', 'light-content'));
    }
  }, [focus, dispatch, statusBarBG]);

  async function ConfirmWithdraw() {
    await api
      .put(
        `orders/deliveryman/${delivery.deliveryman.id}/withdraw/${delivery.id}`,
        null,
        {
          params: {
            start_date: new window.Date().getTime(),
          },
        }
      )
      .then(response => {
        if (response.status === 200) {
          Alert.alert('Sucesso', 'Encomenda retirada com sucesso!', [
            {
              text: 'Ok',
              onPress: () => navigate('DeliveriesStack'),
            },
          ]);
        }
      })
      .catch(error => {
        if (error.response.status === 400) {
          Alert.alert(
            'Opa!',
            'A entrega só pode ser retirada entre 08:00 às 18:00'
          );
        }
      });
  }

  return (
    <Background>
      <ContainerEffect />
      <Container>
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
        <ButtomGroup display={delivery.end_date ? 1 : 0}>
          <ButtomContainer
            onPress={() => navigate('InfoProblem', { id: delivery.id })}
          >
            <Icon name="highlight-off" color="#E74040" size={20} />
            <ButtonText>Informar</ButtonText>
            <ButtonText>Problema</ButtonText>
          </ButtomContainer>
          <BorderButtom />
          <ButtomContainer
            onPress={() => navigate('Problem', { id: delivery.id })}
          >
            <Icon name="info-outline" color="#E7BA40" size={20} />
            <ButtonText>Visualizar</ButtonText>
            <ButtonText>Problemas</ButtonText>
          </ButtomContainer>
          <BorderButtom />
          <ConfirmContainer
            display={delivery.start_date ? 1 : 0}
            onPress={() =>
              navigate('ConfirmDelivery', {
                idDelivery: delivery.id,
                idDeliveryman: delivery.deliveryman.id,
              })
            }
          >
            <Icon name="alarm-on" color="#7D40E7" size={20} />
            <ButtonText>Confirmar</ButtonText>
            <ButtonText>Entrega</ButtonText>
          </ConfirmContainer>
          <ConfirmContainer
            display={!delivery.start_date ? 1 : 0}
            onPress={ConfirmWithdraw}
          >
            <Icon name="alarm-on" color="#7D40E7" size={20} />
            <ButtonText>Confirmar</ButtonText>
            <ButtonText>Retirada</ButtonText>
          </ConfirmContainer>
        </ButtomGroup>
      </Container>
    </Background>
  );
}

DeliveryDetail.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
  route: PropTypes.shape({
    params: PropTypes.shape({
      delivery: PropTypes.shape({
        id: PropTypes.number,
        status: PropTypes.string,
        product: PropTypes.string,
        start_date: PropTypes.string,
        end_date: PropTypes.string,
        deliveryman: PropTypes.shape({
          id: PropTypes.number,
        }),
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
