import React, { useState, useEffect, useCallback } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { ActivityIndicator, View } from 'react-native';
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
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState();

  const loadProblems = useCallback(
    async function loadProblems() {
      setLoading(true);
      const response = await api.get(`delivery/${id}/problems?page=${page}`);
      setLoading(false);

      setProblems(p =>
        page > 1 ? [...p, ...response.data.problems] : response.data.problems
      );
      setTotalPages(Math.ceil(response.data.count / 10));
    },
    [id, page]
  );

  const loadMore = useCallback(
    function load() {
      if (page < totalPages) setPage(page + 1);
    },
    [page, totalPages]
  );

  function renderFooter() {
    if (!loading) return null;
    return (
      <View>
        <ActivityIndicator color="#E74040" size="small" />
      </View>
    );
  }

  function renderEmpty() {
    return (
      <TextContainer>
        <TextMenu>
          Nenhum dado a ser mostrado aguarde o carregamento ...
        </TextMenu>
      </TextContainer>
    );
  }

  useEffect(() => {
    if (!focus) {
      setPage(1);
      setProblems([]);
    }
    if (focus) {
      loadProblems();
    }
  }, [focus, loadProblems]);

  function renderList() {
    return (
      <>
        <List
          ListEmptyComponent={renderEmpty}
          ListFooterComponent={renderFooter}
          onEndReachedThreshold={0.05}
          onEndReached={loadMore}
          data={problems}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => <ProblemItem problem={item} />}
        />
      </>
    );
  }

  return (
    <Background>
      <ContainerEffect />
      <Container>
        <TitleDelivery>Encomenda {id}</TitleDelivery>
        {renderList()}
      </Container>
    </Background>
  );
}

Problem.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.object,
  }).isRequired,
};
