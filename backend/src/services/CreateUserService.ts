import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import User from '../models/User';

interface Request {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({ name, email, password }: Request): Promise<User> {
    const userRepository = getRepository(User);

    /* O Banco já impede email ducplicado, mas ainda sim, vamos implementar essa
    regra na nossa aplicação e não deixar apenas a cargo do banco */
    const checkEmailExists = await userRepository.findOne({
      where: { email },
    });

    if (checkEmailExists) throw new Error('Email addres already used.');

    const hashedPassword = await hash(password, 10);

    const user = userRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    await userRepository.save(user);

    return user;
  }
}

export default CreateUserService;
