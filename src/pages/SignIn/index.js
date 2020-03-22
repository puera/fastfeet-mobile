import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import { Image, Alert } from 'react-native';
import PropTypes from 'prop-types';

import api from '~/services/api';

import logo from '~/assets/fastfeet-logo.png';

import { signInRequest } from '~/store/modules/auth/actions';
import { statusBarConfig } from '~/store/modules/user/actions';

import { Container, Background, Form, FormInput, SubmitButton } from './styles';

export default function SignIn() {
  const loading = useSelector(state => state.auth.loading);
  const dispatch = useDispatch();
  const focus = useIsFocused();

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

  useEffect(() => {
    if (focus) dispatch(statusBarConfig('#7159c1', 'light-content'));
  }, [dispatch, focus]);

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
