import React, {useCallback, useRef} from 'react';
import {Image, KeyboardAvoidingView, Platform, View, ScrollView, TextInput} from 'react-native';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Icon from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import {Form} from '@unform/mobile';
import {FormHandles} from '@unform/core';

import logoImg from '../../assets/logo.png';
import {Container, Title, ForgotPassword, ForgotPasswordText,  CreateAccountButton, CreateAccountButtonText} from './styles';

const SignIn:React.FC = () => {

  //A gente cria Refs quando queremos manipular em elemento de forma direta e não por eventos
  const formRef = useRef<FormHandles>(null);
  const inputPasswordRef = useRef<TextInput>(null);

  const navigation = useNavigation();

  const handleSignIn = useCallback((data: object) => {
    console.log(data);
  }, []);

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
            <Title>Faça Seu Logon</Title>
          </View>

          <Form ref={formRef} onSubmit={handleSignIn}>
            <Input
              autoCorrect={false}
              autoCapitalize='none'
              keyboardType='email-address'
              name='email'
              icon='mail'
              placeholder='E-Mail'
              returnKeyType="next" //Altera o icon do input submit/enter para NEXT
              onSubmitEditing={() => inputPasswordRef.current?.focus()} //Faz o ENTER nese input chamar a função
            />
            <Input
              ref={inputPasswordRef}
              name='password'
              icon='lock'
              placeholder='Senha'
              secureTextEntry
              returnKeyType="send" //Altera o icon do input submit/enter para SEND
              onSubmitEditing={() => { //Faz o ENTER nese input chamar a função
                formRef.current?.submitForm();
               }}
            />
            <Button onPress={() => {
              //? verifica antes se é ou não null e chama submitForm() se não for null
              formRef.current?.submitForm();
             }}>Entrar</Button>
          </Form>

          <ForgotPassword onPress={() => {alert('pressed')}}>
            <ForgotPasswordText>Esqueci minha senha</ForgotPasswordText>
          </ForgotPassword>

          <CreateAccountButton onPress={() => { navigation.navigate('SignUp'); }}>
            <Icon name='log-in' size={20} color='#ff9000'/>
            <CreateAccountButtonText>Criar conta</CreateAccountButtonText>
          </CreateAccountButton>

        </Container>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export default SignIn;
