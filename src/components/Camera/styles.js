import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

import Button from '~/components/Button';

export const Container = styled.View`
  flex: 1;
  padding: 20px 20px;
  justify-content: space-between;
  align-items: center;
`;

export const CameraContainer = styled.View`
  margin-top: 20px;
  align-self: stretch;
  height: 400px;
`;

export const CameraButton = styled(RectButton)`
  align-self: center;
  display: ${props => (props.visible ? 'none' : 'flex')};
`;

export const CameraIcon = styled.View`
  background-color: #0000004d;
  width: 80px;
  height: 80px;
  border-radius: 80px;
  align-self: center;
`;

export const PreviewShot = styled.Image`
  flex: 1;
`;

export const SubmitButton = styled(Button)`
  display: ${props => (props.visible ? 'flex' : 'none')};
  margin-top: 20px;
  align-self: stretch;
  background-color: #7d40e7;
`;

export const RemoveButton = styled(Button)`
  display: ${props => (props.visible ? 'flex' : 'none')};
  margin-top: 20px;
  align-self: stretch;
  background-color: #e74040;
`;
