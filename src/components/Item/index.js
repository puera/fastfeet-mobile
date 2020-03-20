import React, { useMemo } from 'react';
import { TouchableOpacity, View } from 'react-native';
import PropTypes from 'prop-types';
import { parseISO, format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  Contanier,
  DeliveryHeader,
  DeliveryHeaderTitle,
  DeliveryHeaderStatus,
  DeliveryFooter,
  DeliveryFooterGroup,
  DeliveryFooterLabel,
  DeliveryFooterValue,
  DetailsButtonText,
  Step,
  Dot,
  StepName,
  Line,
} from './styles';

export default function DeliveryItem({ delivery, handleSeeDetailsPressed }) {
  const dateFormatted = useMemo(
    () =>
      format(parseISO(delivery.createdAt), 'dd/MM/yyyy', {
        locale: ptBR,
      }),
    [delivery.createdAt]
  );
  return (
    <Contanier>
      <DeliveryHeader>
        <View style={{ flexDirection: 'row' }}>
          <Icon name="local-shipping" size={24} color="#7159c1" />
          <DeliveryHeaderTitle>Encomenda {delivery.id}</DeliveryHeaderTitle>
        </View>
        <DeliveryHeaderStatus>
          <Line />
          <Step>
            <Dot filled />
            <StepName>Aguardando</StepName>
          </Step>
          <Step>
            <Dot filled />
            <StepName>Retirada</StepName>
          </Step>
          <Step>
            <Dot />
            <StepName>Entregue</StepName>
          </Step>
        </DeliveryHeaderStatus>
      </DeliveryHeader>
      <DeliveryFooter>
        <DeliveryFooterGroup>
          <DeliveryFooterLabel>Data</DeliveryFooterLabel>
          <DeliveryFooterValue>{dateFormatted}</DeliveryFooterValue>
        </DeliveryFooterGroup>
        <DeliveryFooterGroup>
          <DeliveryFooterLabel>Cidade</DeliveryFooterLabel>
          <DeliveryFooterValue>{delivery.recipient.city}</DeliveryFooterValue>
        </DeliveryFooterGroup>
        <TouchableOpacity onPress={handleSeeDetailsPressed}>
          <DetailsButtonText>Ver detalhes</DetailsButtonText>
        </TouchableOpacity>
      </DeliveryFooter>
    </Contanier>
  );
}

DeliveryItem.propTypes = {
  delivery: PropTypes.shape({
    id: PropTypes.number.isRequired,
    status: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    recipient: PropTypes.shape({
      city: PropTypes.string.isRequired,
    }),
  }).isRequired,
  handleSeeDetailsPressed: PropTypes.func.isRequired,
};
