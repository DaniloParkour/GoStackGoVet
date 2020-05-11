import React from 'react';
import {
  RouteProps as ReactDOMRouteProps,
  Route as ReactDOMRoute,
  Redirect,
} from 'react-router-dom';

import { boolean } from 'yup';
import { useAuth } from '../hooks/auth';

interface RouteProps extends ReactDOMRouteProps {
  isPrivate?: boolean;
  component: React.ComponentType; // Receber o nome do componente (Dashboard), não é o componente (<Dashboard/>)
}

const Route: React.FC<RouteProps> = ({
  isPrivate = false,
  component: Component,
  ...rest
}) => {
  // Se o user tiver conteúdo é porque tem usuário logado na aplicação
  const { user } = useAuth();

  return (
    <ReactDOMRoute
      {...rest}
      render={({ location }) => {
        return isPrivate === !!user ? (
          <Component /> // Vai pro componente se (está logado e é privado) ou se (não está logado e não é privado)
        ) : (
          // Redireciona se (está logado e não é privado) ou se (não esstá logado e é privado)
          <Redirect
            to={{
              pathname: isPrivate ? '/' : 'dashboard',
              state: { from: location }, // Passando from loction para ele guardar essa página no historico mesmo ela não tendo sido acessada
            }}
          />
        );
      }}
    />
  );
};

export default Route;
