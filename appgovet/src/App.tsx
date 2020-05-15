import 'react-native-gesture-handler';

import React from 'react';
import {View, StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';

import Routes from './routes';

const App:React.FC = () => {

  /* O componente NavigationContainer tem que estar em volta de toda a aplicação é equivalente ao
     Provider que prover os contextos da aplicação WEB que foi feito nas aulas anteriores
     Toda a navegação é feita baseada em contextos
  */

  return(
    <NavigationContainer>
      <StatusBar barStyle='light-content' backgroundColor='#312e38'/>
      <View style={{flex: 1, backgroundColor: '#312e38'}}>
        <Routes/>
      </View>
    </NavigationContainer>
  );
}

export default App;
