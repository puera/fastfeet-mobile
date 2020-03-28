import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Alert, ActivityIndicator, Text } from 'react-native';
import { RNCamera } from 'react-native-camera';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  Container,
  CameraButton,
  CameraIcon,
  PreviewShot,
  SubmitButton,
  RemoveButton,
  CameraContainer,
} from './styles';

import api from '~/services/api';

export default function Camera({ PackageId, DeliverId, onPressed }) {
  const [loading, setLoading] = useState(false);
  const [previewShot, setPreviewShot] = useState();

  const cameraRef = useRef();

  async function takePicture() {
    const options = { quality: 1, base64: true, width: 300 };
    setLoading(true);
    const data = await cameraRef.current.takePictureAsync(options);
    setLoading(false);
    setPreviewShot(data.uri);
  }

  async function handleSubmit() {
    const dataForm = new FormData();
    dataForm.append('file', {
      uri: previewShot,
      name: `Signature_Package${PackageId}.jpg`,
      type: 'image/*',
    });

    setLoading(true);

    await api
      .put(`orders/deliveryman/${DeliverId}/delivered/${PackageId}`, dataForm, {
        params: {
          end_date: new Date().getTime(),
        },
      })
      .then(response => {
        if (response.status === 200) {
          Alert.alert('Sucesso!', 'Foto enviada com sucesso!', [
            {
              text: 'Ok',
              onPress: () => onPressed(),
            },
          ]);
        }
      })
      .catch(error => {
        if (error.response.status === 400) {
          Alert.alert(error.response.data.error);
        }
      });
    setLoading(false);
  }

  return (
    <>
      <Container>
        {previewShot ? (
          <CameraContainer>
            <PreviewShot source={{ uri: previewShot }} />
          </CameraContainer>
        ) : (
          <CameraContainer>
            <RNCamera
              ref={cameraRef}
              style={{
                flex: 1,
                marginTop: 20,
              }}
              androidCameraPermissionOptions={{
                title: 'Opa!',
                message: 'Precisamos que você nos autorize a usar sua câmera',
                buttonPositive: 'Ok',
                buttonNegative: 'Cancelar',
              }}
              autoFocus="on"
              type="back"
              flashMode="auto"
              captureAudio={false}
            />
          </CameraContainer>
        )}

        <CameraButton visible={previewShot ? 1 : 0} onPress={takePicture}>
          {loading ? (
            <>
              <ActivityIndicator size="large" color="#fff" />
              <Text
                style={{ color: '#fff', textAlign: 'center', fontSize: 10 }}
              >
                Carregando a foto, por favor aguarde!
              </Text>
            </>
          ) : (
            <CameraIcon>
              <Icon
                name="photo-camera"
                size={35}
                color="#FFF"
                style={{ alignSelf: 'center', marginTop: 24 }}
              />
            </CameraIcon>
          )}
        </CameraButton>
        <SubmitButton visible={previewShot ? 1 : 0} onPress={handleSubmit}>
          Enviar
        </SubmitButton>
        <RemoveButton
          visible={previewShot ? 1 : 0}
          onPress={() => setPreviewShot()}
        >
          Remover
        </RemoveButton>
      </Container>
    </>
  );
}

Camera.propTypes = {
  PackageId: PropTypes.number.isRequired,
  DeliverId: PropTypes.number.isRequired,
  onPressed: PropTypes.func.isRequired,
};
