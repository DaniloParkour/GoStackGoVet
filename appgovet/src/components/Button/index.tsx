import React from 'react';
import {RectButtonProperties} from 'react-native-gesture-handler';
import {Container, ButtonText} from './styles';

interface ButtonProps extends RectButtonProperties {
  children: string; //Tornando o children do Button obrigatório
}

const Button:React.FC<ButtonProps> = ({children, ...rest}) => {
  return(
    <Container {...rest}>
      {/*Um texto no React Native tem que ser colocado dentro de um TEXT*/}
      <ButtonText>{children}</ButtonText>
    </Container>
  );
}

export default Button;
