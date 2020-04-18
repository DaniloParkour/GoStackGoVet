import Appointment from '../models/Appointment';
import {isEqual} from 'date-fns';

interface CreatrAppointmentDTO {
  provider: string;
  date: Date;
}

//Metodos para se fazer em cima dos dados. O CRUD vem aqui
class AppointmentsRepository {
  private appointments: Appointment[];

  constructor() {
    this.appointments = [];
  }

  public all(): Appointment[] {
    return this.appointments;
  }

  public findByDate(date: Date): Appointment | null {
    const findAppointment = this.appointments.
    find(appointment => isEqual(date, appointment.date));
    
    return findAppointment || null;
  }

  //public create(provider: string, date: Date): Appointment {
  //public create(data: CreatrAppointmentDTO): Appointment {
  public create({provider, date}: CreatrAppointmentDTO): Appointment {

    //const appointment = new Appointment(data.provider, data.date);
    const appointment = new Appointment({provider, date});
    this.appointments.push(appointment);
    return appointment;

  }

}

export default AppointmentsRepository;