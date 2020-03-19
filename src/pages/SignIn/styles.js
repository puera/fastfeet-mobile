import styled from 'styled-components/native';
import { Platform } from 'react-native';

import Button from '~/components/Button';
import Input from '~/components/Input';

export const Background = styled.View`
  background-color: #7159c1;
  flex: 1;
`;

export const Container = styled.KeyboardAvoidingView.attrs({
  enable: Platform.OS === 'ios',
  behavior: 'padding',
})`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 0 30px;
`;

export const Form = styled.View`
  align-self: stretch;
  margin-top: 50px;
`;

export const FormInput = styled(Input)`
  margin-bottom: 10px;
`;

export const SubmitButton = styled(Button)`
  margin-top: 5px;
`;
