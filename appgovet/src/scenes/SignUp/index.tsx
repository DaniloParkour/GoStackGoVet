import React, {useRef} from 'react';
import {Image, KeyboardAvoidingView, Platform, View, ScrollView} from 'react-native';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Icon from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import {Form} from '@unform/mobile';
import {FormHandles} from '@unform/core';

import logoImg from '../../assets/logo.png';
import {Container, Title, BackToSignIn, BackToSignInText} from './styles';

const SignUp:React.FC = () => {

  const formRef = useRef<FormHandles>(null);
  const navigation = useNavigation();

  return(
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      enabled
    >
      <ScrollView
        keyboardShouldPersistTaps='handled'
        contentContainerStyle={{flex: 1}}
      >
        <Container>
          <Image source={logoImg} />
          <View>
            <Title>Crie Sua Conta</Title>
          </View>

          <Form ref={formRef} onSubmit={(data) => {console.log(data)}}>
            <Input name='nome' icon='user' placeholder='Nome' />
            <Input name='email' icon='mail' placeholder='E-Mail' />
            <Input name='password' icon='lock' placeholder='Senha' />
            <Button onPress={() => formRef.current.submitForm()}>Entrar</Button>
          </Form>

          <BackToSignIn onPress={() => {navigation.goBack()}}>
            <Icon name='arrow-left' size={20} color='#fff'/>
            <BackToSignInText>Voltar para login</BackToSignInText>
          </BackToSignIn>

        </Container>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export default SignUp;
