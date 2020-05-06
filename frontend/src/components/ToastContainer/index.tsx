import React from 'react';
import { useTransition } from 'react-spring';
import { Container } from './styles';
import { ToastMessage } from '../../hooks/toast';
import Toast from './Toast';

interface ToastContainerProps {
  messages: ToastMessage[];
}

const ToastContainer: React.FC<ToastContainerProps> = ({ messages }) => {
  const messageWithTransitions = useTransition(
    messages,
    (message) => message.id,
    {
      from: { right: '-120%', opacity: 0, transform: 'rotateX(0deg)' }, // 120% do tamanho dele a partir da posição que ele está
      enter: { right: '0%', opacity: 1, transform: 'rotateX(360deg)' },
      leave: { right: '-120%', opacity: 0, transform: 'rotateX(0deg)' },
      // leave: { right: '-120%', opacity, ...CSSoptions },
    },
  );

  return (
    <Container>
      {messageWithTransitions.map((
        { item, key, props }, // Props são as propriedades de estilização
      ) => (
        <Toast style={props} key={key} message={item} />
      ))}
    </Container>
  );
};

export default ToastContainer;
