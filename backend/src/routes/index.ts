import { Router } from 'express';
import appointmentsRouter from './appointments.routes';

const routes = Router();

// routes.get, post, get, delete, ...

//Para qualquer tipo de solicitação mandar para appointments router
routes.use('/appointments', appointmentsRouter);

export default routes;
