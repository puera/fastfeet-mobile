import React from 'react';

import Background from '~/components/Background';
import ContainerEffect from '~/components/ContainerEffect';

export default function Problem({ route }) {
  const { id } = route.params;
  console.tron.log(id);
  return (
    <Background>
      <ContainerEffect />
    </Background>
  );
}
