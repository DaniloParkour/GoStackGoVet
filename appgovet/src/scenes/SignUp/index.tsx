import React, {useRef, useCallback} from 'react';
import {Image, KeyboardAvoidingView, Platform, View, ScrollView, TextInput, Alert} from 'react-native';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Icon from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import {Form} from '@unform/mobile';
import {FormHandles} from '@unform/core';
import * as Yup from 'yup';
import getValidationErrors from '../../utils/getValidationErros';
import api from '../../services/api';
import logoImg from '../../assets/logo.png';
import {Container, Title, BackToSignIn, BackToSignInText} from './styles';

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
}

const SignUp:React.FC = () => {

  const formRef = useRef<FormHandles>(null);
  const mailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const navigation = useNavigation();

  const handleSignUp = useCallback(
    async (data: SignUpFormData) => {
      // schema de validação é usado para validar objetos inteiros e não campo por campo
      try {
        // Zerar os erros mostrados no fomrulário
        formRef.current?.setErrors({});

        //Os nomes aqui devem ser o mesmo nome do campo (passado pela props name)
        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório.'),
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Email inválido'),
          password: Yup.string().min(
            6,
            'A senha deve conter no mínimo 6 dígitos',
          ),
        });

        // await schema.validate(data);
        await schema.validate(data, {
          // Com o abortEarly falso a gente pode ver toda a varificação e receber de uma vez todos os erros
          abortEarly: false, // Foi colocado para não parar no primeiro erro. Por padrão o Yup para no primeiro erro
        });

        await api.post('/users', data);

        Alert.alert('Cadastro realizado com sucesso!', 'Você já pode fazer login na aplicação.');

        navigation.goBack();

        /*addToast({
          type: 'success',
          title: 'Cadastro realizado',
          description: 'Você já pode fazer seu logon no GoVet',
        });

        history.push('/');*/
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
          /* formRef.current?.setErrors({
          name: 'Nome obrigatório',
        }); */
          return;
        }

        Alert.alert('Erro no cadastro', 'Ocorreu um erro ao fazer cadastro, tente novamente');
        /*
        addToast({
          type: 'info',
          title: 'Erro no cadastro',
          description: 'Ocorreu um erro ao fazer cadastro, tente novamente',
        });
        */
      }
    },
    [navigation],
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
            <Title>Crie Sua Conta</Title>
          </View>

          <Form ref={formRef} onSubmit={handleSignUp}>
            <Input
              autoCapitalize="words"
              name='name'
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
