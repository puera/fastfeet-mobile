import styled from 'styled-components/native';

import Button from '~/components/Button';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  margin-top: 20px;
  padding: 0 60px;
`;

export const Input = styled.TextInput`
  height: 300px;
  width: 355px;
  border-radius: 4px;
  border-color: #0000001a;
  border-width: 1px;
  background-color: #ffffff;
  padding: 20px 20px;
`;

export const ButtonInfo = styled(Button)`
  margin-top: 20px;
  background-color: #7d40e7;
  align-self: stretch;
`;
