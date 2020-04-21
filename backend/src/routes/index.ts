import { Router } from 'express';
import appointmentsRouter from './appointments.routes';
import usersRouter from './users.routes';

const routes = Router();

// routes.get, post, get, delete, ...

// Para qualquer tipo de solicitação mandar para appointments router
routes.use('/appointments', appointmentsRouter);
routes.use('/users', usersRouter);

export default routes;
