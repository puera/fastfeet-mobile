import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useIsFocused } from '@react-navigation/native';
import { useSelector } from 'react-redux';

import api from '~/services/api';

import DeliveryItem from '~/components/Item';
import Profile from '~/components/Profile';
import Background from '~/components/Background';

import { Container, List } from './styles';

export default function Delivery({ navigation: { push } }) {
  const profile = useSelector(state => state.user.profile);
  const isFocused = useIsFocused();

  const [pendingDeliveries, setPendingDeliveries] = useState([]);

  useEffect(() => {
    async function loadDeliveries() {
      const [pendingResponse] = await Promise.all([
        api.get(`deliveryman/${profile?.id}/list`),
      ]);

      setPendingDeliveries(pendingResponse.data.deliveries);
    }

    if (isFocused) loadDeliveries();
  }, [isFocused, profile]);

  function renderProfile() {
    return <Profile profile={profile} />;
  }

  function renderList() {
    return (
      <List
        data={pendingDeliveries}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => (
          <DeliveryItem
            delivery={item}
            handleSeeDetailsPressed={() =>
              push('DeliveryDetail', {
                delivery: item,
              })
            }
          />
        )}
      />
    );
  }

  return (
    <Background>
      <Container>
        {renderProfile()}
        {renderList()}
      </Container>
    </Background>
  );
}

Delivery.propTypes = {
  navigation: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
