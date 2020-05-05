import styled from 'styled-components';

export const Container = styled.div`
  position: relative;

  span {
    width: 160px;
    background: #ff9000;
    padding: 8px;
    border-radius: 4px;
    font-size: 14px;
    font-weight: 500;
    opacity: 0;
    transition: opacity 0.4s;
    position: absolute;
    visibility: hidden; /* Esconde o elemento da DOM para evitar problemas como passar o mouse por cima dele e mostrar o conteudo. Sendo que ele deve serm mostrado apenas quando o mouse passar por cima do seu icone de erro */

    /* Elemento Pai é POSITION: RELATIVE
    bottom: 100%; = > Faz o canto inferior esquerdo do componente ficar bem no centro do elemento pai*/
    bottom: calc(100% + 12px);
    left: 50%; /*Alinhar o canto inferior esquerdo com o meio do elemto PAI mas semo mover na vertical*/
    transform: translateX(-50%);
    /* Puxa 50% do tamanho do elemento para a esquerda */
    color: #312e38;

    &::before {
      content: '';
      border-style: solid;
      border-color: #ff9000 transparent;
      border-width: 6px, 6px, 0, 6px;
      top: 100%;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
    }
  }

  &:hover span {
    opacity: 1;
    visibility: visible;
  }
`;
