import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '../config/auth';
import AppError from '../errors/AppError';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT token is missing', 401);
  }

  // O auth é no formato "Bearer Its8s9dscdsnsdB0jU0Djkpoas"
  const [, token] = authHeader.split(' ');

  try {
    const { secret, expiresIn } = authConfig.jwt;

    // const decoded = verify(token, authConfig.jwt.secret);
    const decoded = verify(token, secret);

    // as TokenPayload para fazer ele identificar o sub
    const { sub } = decoded as TokenPayload;

    /* O .user do Request está sendo identificado pois essa informação foi adicionada pelo arquivo
    src/@types/express.d.ts. E agora podemos pegar esses dados do usuário e usar em outros locais */
    request.user = {
      id: sub,
    };

    return next();

    // No TypeScript a gente pode não colocar o (err) caso ele não seja usado
  } catch {
    throw new AppError('Invalid JWT token', 401);
  }
}
