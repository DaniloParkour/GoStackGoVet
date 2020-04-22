import path from 'path';
import multer from 'multer';
import crypto from 'crypto';

const tempFolder = path.resolve(__dirname, '..', '..', 'tmp');

export default {
  directory: tempFolder,
  storage: multer.diskStorage({
    // Vai pegar o diretorio atual, subir duas pastas e entrar na pasta tmp para armazenar os arquivos
    destination: tempFolder,

    filename(resolve, file, callback) {
      const fileHash = crypto.randomBytes(10).toString('HEX');
      const fileName = `${fileHash}-${file.originalname}`;

      // null = não aconteceu erro
      return callback(null, fileName);
    },
  }),
};
