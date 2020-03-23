import React, { useState } from 'react';
import { Alert } from 'react-native';
import PropTypes from 'prop-types';

import Background from '~/components/Background';
import ContainerEffect from '~/components/ContainerEffect';

import api from '~/services/api';

import { Container, Input, ButtonInfo } from './styles';

export default function InfoProblem({ route, navigation: { navigate } }) {
  const { id } = route.params;
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    try {
      if (description) {
        setLoading(true);
        await api.post(`delivery/${id}/problems`, { description });
        setLoading(false);
        Alert.alert('Sucesso!', 'Problema enviado com sucesso!', [
          {
            text: 'Ok',
            onPress: () => navigate('DeliveryDetail'),
          },
        ]);
      } else {
        Alert.alert('Info:', 'Por favor digite o problema antes de enviar!');
      }
    } catch (error) {
      console.tron.error(error);
    }
  }

  return (
    <Background>
      <ContainerEffect />
      <Container>
        <Input
          maxLength={255}
          multiline
          numberOfLines={4}
          textAlignVertical="top"
          keyboardType="default"
          autoCorrect={false}
          autoCapitalize="none"
          placeholder="Inclua aqui o problema que ocorreu na entrega"
          returnKeyType="send"
          onSubmitEditing={handleSubmit}
          value={description}
          onChangeText={setDescription}
        />
        <ButtonInfo loading={loading} onPress={handleSubmit}>
          Enviar
        </ButtonInfo>
      </Container>
    </Background>
  );
}

InfoProblem.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
  route: PropTypes.shape({
    params: PropTypes.object,
  }).isRequired,
};
