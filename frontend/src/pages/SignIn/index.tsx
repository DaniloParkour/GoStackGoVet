import React, { useCallback, useRef } from 'react';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import * as Yup from 'yup';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { Container, Content, Background } from './styles';
import logoImg from '../../assets/logo.svg';
// import { AuthContext } from '../../context/AuthContext';
import { useAuth } from '../../context/AuthContext';
import getValidationErrors from '../../utils/getValidationErros';

import Input from '../../components/Input';
import Button from '../../components/Button';

interface SignFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  // auth terá o conteúdo definifo no AuthContext
  // const auth = useContext(AuthContext);
  // const { user, signIn } = useAuth(); // useContext(AuthContext);
  // console.log(user);

  const { signIn } = useAuth();

  const handleSubmit = useCallback(
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

        signIn({
          email: data.email,
          password: data.password,
        });
      } catch (err) {
        const errors = getValidationErrors(err);
        formRef.current?.setErrors(errors);
        /* formRef.current?.setErrors({
        name: 'Nome obrigatório',
      }); */
      }
    },
    [signIn],
  );

  return (
    <Container>
      <Content>
        <img src={logoImg} alt="GoVet" />
        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Faça Seu Logon</h1>
          <Input name="email" icon={FiMail} placeholder="E-mail" />
          <Input
            name="password"
            icon={FiLock}
            type="password"
            placeholder="Senha"
          />
          <Button type="submit">Entrar</Button>
          <a href="forgot">Esqueci Minha Senha</a>
        </Form>

        <a href="">
          <FiLogIn />
          Criar Conta
        </a>
      </Content>
      <Background />
    </Container>
  );
};

export default SignIn;
