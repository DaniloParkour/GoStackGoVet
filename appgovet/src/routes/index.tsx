import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import SignIn from '../scenes/SignIn';
import SignUp from '../scenes/SignUp';

/*Cada navegação vai sendo criada em uma variável diferente, no caso aqui uma navegação
para a autenticação e outra para o aplicativo*/
const Auth = createStackNavigator();

const AuthRoutes:React.FC = () => {
  return(
    <Auth.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {backgroundColor: '#312e38'},
        //headerStyle : { ... }
        //headerTintColor
        //mais opções de customização ...
      }}
      //initialRouteName='SignUp'
    >
      <Auth.Screen name='SignIn' component={SignIn} />
      <Auth.Screen name='SignUp' component={SignUp} />
    </Auth.Navigator>
  );
}

export default AuthRoutes;
