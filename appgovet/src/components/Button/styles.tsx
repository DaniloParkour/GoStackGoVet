import styled from 'styled-components/native';
import {RectButton} from 'react-native-gesture-handler';

//Coloca entre parenteses SEMPRE que for estilizar um componente de fora do React Native
export const Container = styled(RectButton)`
  width: 100%;
  height: 60px;
  background: #ff9000;
  border-radius: 10px;
  margin-top: 8px;

  justify-content: center;
  align-items: center;
`;
//No React Native, por PADRÃO os componentes já vêm como DISPLAY FLEX

export const ButtonText = styled.Text`
  font-family: 'RobotoSlab-Medium';
  color: #312e38;
  font-size: 18px;
`;
