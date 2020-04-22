import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs'; // File System

import User from '../models/User';
import uploadConfig from '../config/upload';

interface Request {
  user_id: string;
  avatarFileName: string;
}

class UpdateUserAvatarService {
  public async execute({ user_id, avatarFileName }: Request): Promise<User> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne(user_id);

    if (!user) {
      throw new Error('Only Authenticated Users Can Change Avatar!');
    }

    if (user.avatar) {
      // Deletar o Avatar!
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);

      // A funcção STAT traz o STATUS de um arquivo SE ELE EXISTIR
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      // Deletar a imagem caso já exista uma lá
      if (userAvatarFileExists) {
        // Deletar (unlink)
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = avatarFileName;

    await usersRepository.save(user);

    delete user.password;

    return user;
  }
}

export default UpdateUserAvatarService;
