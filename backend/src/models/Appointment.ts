// import { uuid } from 'uuidv4';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('appointments')
class Appointment {
  @PrimaryGeneratedColumn('uuid') // Já faz o this.id = uuid();
  id: string;

  @Column() // Por padrão já é varchar
  provider: string;

  @Column('timestamp with time zone')
  date: Date;

  // Como usamos o TypeORM, não precisamos mais do constructor, o typeorm vai cuidar dessa parte
  // Agora não vamos mais usar o new appointment

  // constructor(provider: string, date: Date) {
  // OBS: O Omit tira o id para que ele não seja passado para o construtor. Sem o Omit o id seria obrigatório
  /*
  constructor({ provider, date }: Omit<Appointment, 'id'>) {
    this.id = uuid();
    this.provider = provider;
    this.date = date;
  } */
}

export default Appointment;
