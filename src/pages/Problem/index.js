import React, { useState, useEffect, useCallback } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';

import Background from '~/components/Background';
import ProblemItem from '~/components/ProblemItem';
import ContainerEffect from '~/components/ContainerEffect';

import api from '~/services/api';

import {
  Container,
  TitleDelivery,
  List,
  TextMenu,
  TextContainer,
} from './styles';

export default function Problem({ route }) {
  const { id } = route.params;
  const [problems, setProblems] = useState([]);
  const focus = useIsFocused();
  const [loading, setLoading] = useState(false);

  const loadProblems = useCallback(
    async function loadProblems() {
      try {
        setLoading(true);
        const response = await api.get(`delivery/${id}/problems`);
        setProblems(response.data);
        setLoading(false);
      } catch (error) {
        console.tron.log(error);
      }
    },
    [id]
  );

  useEffect(() => {
    if (focus) {
      loadProblems();
    }
  }, [focus, loadProblems]);

  function renderList() {
    return (
      <>
        {problems.length ? (
          <List
            data={problems}
            keyExtractor={item => String(item.id)}
            renderItem={({ item }) => <ProblemItem problem={item} />}
          />
        ) : (
          <TextContainer>
            <TextMenu>Nenhum dado a ser mostrado</TextMenu>
          </TextContainer>
        )}
      </>
    );
  }

  return (
    <Background>
      <ContainerEffect />
      <Container>
        <TitleDelivery>Encomenda {id}</TitleDelivery>
        {loading ? (
          <ActivityIndicator
            size="large"
            color="#7D40E7"
            style={{ marginTop: 200 }}
          />
        ) : (
          renderList()
        )}
      </Container>
    </Background>
  );
}

Problem.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.object,
  }).isRequired,
};
