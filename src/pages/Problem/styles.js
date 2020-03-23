import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  margin-top: 20px;
`;

export const TextContainer = styled.View`
  flex: 1;
  justify-content: center;
`;

export const TextMenu = styled.Text`
  font-size: 16px;
  font-weight: bold;
`;

export const TitleDelivery = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: #fff;
`;

export const List = styled.FlatList.attrs({
  showsVertivalScrollIndicator: false,
  contentContainerStyle: { marginTop: 15 },
})``;
