import { Router } from 'express';

import AuthenticateUserService from '../services/AuthenticateUserService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  try {
    const { email, password } = request.body;

    const authenticateUser = new AuthenticateUserService();

    const { user, token } = await authenticateUser.execute({ email, password });

    // Nunca responder com o retorno do service diretamente pois o retorno pode mudar depois e conter informações que não deveriam ir na resposta
    // Usar sempre nomes de variáveis bem descritivas
    delete user.password;

    return response.json({ user, token });
  } catch (err) {
    response.status(400).json({ error: err.message });
  }
});

export default sessionsRouter;
