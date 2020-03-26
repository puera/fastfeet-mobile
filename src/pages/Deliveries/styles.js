import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
  margin: 0 20px;
`;

export const List = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: { marginTop: 15 },
})``;

export const HeaderList = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 20px 3px 5px;
`;

export const TextList = styled.Text`
  font-size: 29px;
  font-weight: bold;
`;

export const MenuList = styled.View`
  margin-right: 5px;
  flex-direction: row;
`;

export const TextMenu = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: ${props => (props.selected ? '#7d40e7' : '#999')};
  text-decoration: ${props => (props.selected ? 'underline' : 'none')};
`;

export const Menu = styled.TouchableOpacity`
  margin-left: 15px;
`;
