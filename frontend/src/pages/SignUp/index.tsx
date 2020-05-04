import React, { useCallback } from 'react';
import { FiArrowLeft, FiMail, FiLock, FiUser } from 'react-icons/fi';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { Container, Content, Background } from './styles';
import logoImg from '../../assets/logo.svg';

import Input from '../../components/Input';
import Button from '../../components/Button';

const SignUp: React.FC = () => {
  const handleSubmit = useCallback(async (data: object) => {
    // schema de validação é usado para validar objetos inteiros e não campo por campo
    try {
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
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <Container>
      <Background />
      <Content>
        <img src={logoImg} alt="GoVet" />
        <Form
          initialData={{ email: 'defaultValue@email.com' }}
          onSubmit={handleSubmit}
        >
          <h1>Faça Seu Logon</h1>
          <Input name="name" icon={FiUser} placeholder="Nome" />
          <Input name="email" icon={FiMail} placeholder="E-mail" />
          <Input
            name="password"
            icon={FiLock}
            type="password"
            placeholder="Senha"
          />
          <Button type="submit">Cadastrar</Button>
        </Form>

        <a href="">
          <FiArrowLeft />
          Voltar
        </a>
      </Content>
    </Container>
  );
};

export default SignUp;
