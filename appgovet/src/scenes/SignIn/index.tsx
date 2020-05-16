import React, {useCallback, useRef} from 'react';
import {Image, KeyboardAvoidingView, Platform, View, ScrollView, TextInput, Alert} from 'react-native';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Icon from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import {Form} from '@unform/mobile';
import {FormHandles} from '@unform/core';
import * as Yup from 'yup';
import {useAuth} from '../../hooks/auth';
import getValidationErrors from '../../utils/getValidationErros';

import logoImg from '../../assets/logo.png';
import {Container, Title, ForgotPassword, ForgotPasswordText,  CreateAccountButton, CreateAccountButtonText} from './styles';

interface SignFormData {
  email: string;
  password: string;
}

const SignIn:React.FC = () => {

  //A gente cria Refs quando queremos manipular em elemento de forma direta e não por eventos
  const formRef = useRef<FormHandles>(null);
  const inputPasswordRef = useRef<TextInput>(null);

  const navigation = useNavigation();

  const {signIn, user} = useAuth();

  console.log(user);

  const handleSignIn = useCallback(
    async (data: SignFormData) => {
      // schema de validação é usado para validar objetos inteiros e não campo por campo
      try {
        // Zerar os erros mostrados no fomrulário
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Email inválido'),
          password: Yup.string().required('Senha obrigatória'),
        });

        // await schema.validate(data);
        await schema.validate(data, {
          // Com o abortEarly falso a gente pode ver toda a varificação e receber de uma vez todos os erros
          abortEarly: false, // Foi colocado para não parar no primeiro erro. Por padrão o Yup para no primeiro erro
        });

        //Foi pego do Hooks useAuth, usar o contexto de autenticação
        await signIn({
          email: data.email,
          password: data.password,
        });



      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
          /* formRef.current?.setErrors({
            name: 'Nome obrigatório',
          }); */
          return;
        }

        Alert.alert('Erro na validação', 'Ocorreu um erro no login, verifique se o email e senha estão corretos');

        /*addToast({
          type: 'info',
          title: 'Erro no login',
          description:
            'Ocorreu um erro no login, verifique se o email e senha estão corretos',
        });*/
      }
    },
    [signIn],
  );

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
