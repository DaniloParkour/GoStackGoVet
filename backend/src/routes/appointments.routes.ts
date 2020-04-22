import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const appointmentsRouter = Router();

// const appointments: Appointment[] = [];
// const appointmentsRepository = new AppointmentsRepository();

/* ensureAuthenticated irá passar para as próximas apenas seo usuário estiver autenticado.
Isso torna as rotas de APPOINTMENTS disponíveis apenas para usuários autenticados. */
appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.get('/', async (req, res) => {
  // O arquivo src/@types/express.d.ts define o campo USER dentro do tipo Request
  console.log(`User ID${req.user}`);

  const appointmentsRepository = getCustomRepository(AppointmentsRepository);
  const appointments = await appointmentsRepository.find();
  return res.json(appointments);
});

appointmentsRouter.post('/', async (req, res) => {
  try {
    const { provider_id, date } = req.body;

    const parsedDate = parseISO(date);

    // O SERVICE já tem acesso ao AppointmentsRepository
    const crateAppointment = new CreateAppointmentService();

    const appointment = await crateAppointment.execute({
      date: parsedDate,
      provider_id,
    });

    return res.json(appointment);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

export default appointmentsRouter;
