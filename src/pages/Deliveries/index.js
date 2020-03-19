import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Avatar from '~/components/Avatar';

import { signOut } from '~/store/modules/auth/actions';

import {
  Container,
  ProfileData,
  PersonalData,
  WelcomeText,
  Name,
  Header,
  LogoutButton,
} from './styles';

export default function Delivery({ navigation }) {
  const deliveryman = useSelector(state => state.user.profile);
  const dispatch = useDispatch();

  function handleSignOut() {
    navigation.reset({ index: 0, routes: [{ name: 'SignIn' }] });
    dispatch(signOut());
  }

  function renderProfile() {
    return (
      <Header>
        <ProfileData>
          <Avatar size={70} url={deliveryman?.avatar?.url}>
            {deliveryman?.name}
          </Avatar>
          <PersonalData>
            <WelcomeText>Bem vindo de volta,</WelcomeText>
            <Name>{deliveryman?.name}</Name>
          </PersonalData>
        </ProfileData>
        <LogoutButton onPress={handleSignOut}>
          <Icon name="exit-to-app" size={30} color="#E74040" />
        </LogoutButton>
      </Header>
    );
  }
  return <Container>{renderProfile()}</Container>;
}

Delivery.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.object,
  }).isRequired,
  navigation: PropTypes.shape({
    reset: PropTypes.func,
  }).isRequired,
};
