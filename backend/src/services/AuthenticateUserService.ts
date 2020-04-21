import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import User from '../models/User';

interface Request {
  email: string;
  password: string;
}

class AuthenticateUserService {
  public async execute({
    email,
    password,
  }: Request): Promise<{ user: 'User'; token: 'string' }> {
    const userRepository = getRepository(User);

    const user = await userRepository.findOne({ where: { email } });

    if (!user) throw new Error('Email or Password incorrect!');

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) throw new Error('Email or Password incorrect!');

    // O chave informada aqui NUNCA deve ir para outro local APENAS FICAR NO BACKEND
    const token = sign({}, 'b7f04bff513c96a84f76e3dc783e7b56', {
      subject: user.id,
      expiresIn: '5d',
    });

    return { user, token };
  }
}
export default AuthenticateUserService;
