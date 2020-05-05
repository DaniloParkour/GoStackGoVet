import React from 'react';
import GlobalStyle from './styles/global';
import { AuthProvider } from './context/AuthContext';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

// <AuthContext.Provider> => Engloba tudo que terá acesso ao seu conteúdo. O value receve os valores que serão compartilhados.
const App: React.FC = () => (
  <>
    <AuthProvider>
      <SignIn />
    </AuthProvider>
    <GlobalStyle />
  </>
);

export default App;
