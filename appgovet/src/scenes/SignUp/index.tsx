import React, {useRef} from 'react';
import {Image, KeyboardAvoidingView, Platform, View, ScrollView, TextInput} from 'react-native';
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
  const mailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);
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
            <Input
              autoCapitalize="words"
              name='nome'
              icon='user'
              placeholder='Nome'
              returnKeyType='next'
              onSubmitEditing={() => mailInputRef.current?.focus()}
            />
            <Input
              ref={mailInputRef}
              keyboardType="email-address"
              autoCorrect={false}
              autoCapitalize="none"
              name='email'
              icon='mail'
              placeholder='E-Mail'
              returnKeyType='next'
              onSubmitEditing={() => { passwordInputRef.current?.focus() }}
            />
            <Input
              ref={passwordInputRef}
              name='password'
              icon='lock'
              placeholder='Senha'
              secureTextEntry
              //textContentType='oneTimeCode' => Não é para esse caso mas aqui o quando recebe um SMS pra autenticação o campo pega automaticamente e preenche
              textContentType='newPassword' //Não sugerir uma senha, deixar o usuário escolher
              returnKeyType='send'
              onSubmitEditing={() => formRef.current?.submitForm()}
            />
            <Button onPress={() => formRef.current?.submitForm()}>Entrar</Button>
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
