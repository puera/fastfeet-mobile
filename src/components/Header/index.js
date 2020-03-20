import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { signOut } from '~/store/modules/auth/actions';

import Avatar from '~/components/Avatar';

import {
  Container,
  ProfileData,
  PersonalData,
  WelcomeText,
  Name,
  LogoutButton,
} from './styles';

export default function Header({ profile }) {
  const dispatch = useDispatch();

  return (
    <Container>
      <ProfileData>
        <Avatar size={70} url={profile?.avatar?.url}>
          {profile?.name}
        </Avatar>
        <PersonalData>
          <WelcomeText>Bem vindo de volta,</WelcomeText>
          <Name>{profile?.name}</Name>
        </PersonalData>
      </ProfileData>
      <LogoutButton onPress={() => dispatch(signOut())}>
        <Icon name="exit-to-app" size={30} color="#E74040" />
      </LogoutButton>
    </Container>
  );
}

Header.propTypes = {
  profile: PropTypes.shape({
    name: PropTypes.string.isRequired,
    avatar: PropTypes.shape({
      url: PropTypes.string.isRequired,
    }),
  }),
};

Header.defaultProps = {
  profile: null,
};
