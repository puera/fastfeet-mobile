import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
  margin: 0 20px;
`;

export const List = styled.FlatList.attrs({
  showsVertivalScrollIndicator: false,
  contentContainerStyle: { marginTop: 15 },
})``;
