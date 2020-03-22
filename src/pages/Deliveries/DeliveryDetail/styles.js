import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  align-items: center;
`;

export const ContainerEffect = styled.View`
  height: 90px;
  width: 100%;
  background-color: #7d40e7;
  position: absolute;
`;

export const ButtomGroup = styled.View`
  margin-top: 20px;
  flex-direction: row;
  height: 83px;
  width: 400px;
  background-color: #0000001a;
  border-color: #f8f9fd;
  border-radius: 4px;
  justify-content: space-between;
  padding: 10px 25px;
`;

export const ButtomContainer = styled.TouchableOpacity`
  align-items: center;
`;

export const ButtonText = styled.Text`
  font-size: 15px;
  color: #999999;
`;

export const BorderButtom = styled.View`
  border-width: 1px;
  border-color: #0000001a;
`;

export const ContainerDelivery = styled.View`
  height: 290px;
  width: 400px;
  background-color: #fff;
  border-radius: 4px;
  border-color: #0000001a;
  border-width: 1px;
  margin-top: 20px;
  padding-left: 14px;
`;

export const ContainerSituation = styled.View`
  height: 180px;
  width: 400px;
  background-color: #fff;
  border-radius: 4px;
  border-color: #0000001a;
  border-width: 1px;
  padding-left: 14px;
  margin-top: 20px;
`;

export const DeliveryHeader = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const TextHeaderDelivery = styled.Text`
  font-size: 19px;
  font-weight: bold;
  color: #7d40e7;
  margin-left: 10px;
`;

export const TextHeader = styled.Text`
  font-size: 19px;
  color: #999999;
  font-weight: bold;
`;

export const RecipientContainer = styled.View`
  margin-bottom: 19px;
`;

export const TextDelivery = styled.Text`
  font-size: 19px;
  color: #666666;
`;

export const DateContainer = styled.View`
  flex-direction: row;
`;

export const Date = styled.View`
  margin-left: 25px;
`;
