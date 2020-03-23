import styled from 'styled-components/native';

export const Container = styled.View`
  flex-direction: row;
  width: 400px;
  height: 55px;
  align-self: stretch;
  align-items: center;
  border: 1px solid #0000001a;
  border-radius: 4px;
  background: #fff;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15);
  padding: 5px 10px;
  margin-bottom: 20px;
  justify-content: space-between;
`;

export const ContainerDescription = styled.View`
  width: 250px;
`;

export const ProblemDescription = styled.Text.attrs({
  numberOfLines: 1,
})`
  font-size: 21px;
  color: #999999;
`;

export const ProblemDate = styled.Text`
  font-size: 16px;
  color: #c1c1c1;
`;
