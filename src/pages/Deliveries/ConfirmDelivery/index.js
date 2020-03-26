import React from 'react';
import Proptypes from 'prop-types';

import Background from '~/components/Background';
import ContainerEffect from '~/components/ContainerEffect';
import Camera from '~/components/Camera';

import { Container, CameraContainer } from './styles';

export default function ConfirmDelivery({ route, navigation: { navigate } }) {
  const { idDelivery, idDeliveryman } = route.params;
  console.tron.log(idDelivery, idDeliveryman);
  return (
    <Background>
      <ContainerEffect />
      <Container>
        <CameraContainer>
          <Camera
            PackageId={idDelivery}
            DeliverId={idDeliveryman}
            onPressed={() => navigate('DeliveriesStack')}
          />
        </CameraContainer>
      </Container>
    </Background>
  );
}

ConfirmDelivery.propTypes = {
  route: Proptypes.shape({
    params: Proptypes.object,
  }).isRequired,
  navigation: Proptypes.shape({
    navigate: Proptypes.func,
  }).isRequired,
};
