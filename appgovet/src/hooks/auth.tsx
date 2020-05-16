import React, { createContext, useCallback, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import api from '../services/api';

interface AuthState {
  token: string;
  user: object;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: object;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>({} as AuthState);

  useEffect(() => {
    async function loadStorageData(): Promise<void> {

      const [token, user] = await AsyncStorage.multiGet([
        '@GoVet:token',
        '@GoVet:user',
      ]);

      if(token[1] && user[1]) {
        setData({ token: token[1], user: JSON.parse(user[1]) });
      }

        //Da parte WEB
        //if (token && user) return { token, user: JSON.parse(user) };
        //return {} as AuthState;
    }
  }, [])

  const signIn = useCallback(async ({ email, password }) => {
    // const response = await api.post<{ token: string; user: string }>(
    const response = await api.post('sessions', { email, password });

    const { token, user } = response.data;

    //await AsyncStorage.setItem('@GoVet:token', token);
    //await AsyncStorage.setItem('@GoVet:user', JSON.stringify(user));

    await AsyncStorage.multiSet([
      ['@GoVet:token', token],
      ['@GoVet:user', JSON.stringify(user)],
    ]);

    setData({ token, user });
  }, []);

  const signOut = useCallback(async () => {
    await AsyncStorage.multiRemove([
      '@GoVet:token',
      '@GoVet:user',
    ]);

    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider value={{ user: data.user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuto must be used within an AuthProvider');
  return context;
}
