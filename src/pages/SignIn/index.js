import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Image, Alert } from 'react-native';
import PropTypes from 'prop-types';

import api from '~/services/api';

import logo from '~/assets/fastfeet-logo.png';

import { signInRequest } from '~/store/modules/auth/actions';

import { Container, Background, Form, FormInput, SubmitButton } from './styles';

export default function SignIn() {
  const loading = useSelector(state => state.auth.loading);
  const dispatch = useDispatch();

  const [id, setId] = useState();

  async function handleSubmit() {
    try {
      const response = await api.get(`delivermans/${id}`);
      if (response.data) {
        dispatch(signInRequest(id));
      } else {
        Alert.alert('Erro', 'Identificação inválida');
      }
    } catch (error) {
      Alert.alert('Erro', 'Verifique seus dados');
    }
  }

  return (
    <Background>
      <Container>
        <Image source={logo} />
        <Form>
          <FormInput
            keyboardType="number-pad"
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Informe seu ID de Cadastro"
            returnKeyType="send"
            onSubmitEditing={handleSubmit}
            value={id}
            onChangeText={setId}
          />
          <SubmitButton loading={loading} onPress={handleSubmit}>
            Entrar no sistema
          </SubmitButton>
        </Form>
      </Container>
    </Background>
  );
}

SignIn.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
