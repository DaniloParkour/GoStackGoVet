import { EntityRepository, Repository } from 'typeorm';
import Appointment from '../models/Appointment';

/*
interface CreatrAppointmentDTO {
  provider: string;
  date: Date;
}
*/

// Passammos a notation com a entitade que esse repositório representa
@EntityRepository(Appointment)
class AppointmentsRepository extends Repository<Appointment> {
  /*
  private appointments: Appointment[];

  constructor() {
    this.appointments = [];
  }

  public all(): Appointment[] {
    return this.appointments;
  }
  */

  // public async findByDate(date: Date): Appointment | null {
  // OBS ===> Uma função async se tiver retorno, vai SEMPRE ser uma promisse
  // Nesse caso, no final o retorno ainda será Appointment ou NULL
  public async findByDate(date: Date): Promise<Appointment | null> {
    // const findAppointment = this.appointments.
    // find(appointment => isEqual(date, appointment.date));

    const findAppointment = await this.findOne({
      where: { date },
    });

    return findAppointment || null;
  }

  /*
  //public create(provider: string, date: Date): Appointment {
  //public create(data: CreatrAppointmentDTO): Appointment {
  public create({provider, date}: CreatrAppointmentDTO): Appointment {

    //const appointment = new Appointment(data.provider, data.date);
    const appointment = new Appointment({provider, date});
    this.appointments.push(appointment);
    return appointment;
  */
}

export default AppointmentsRepository;
