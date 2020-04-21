// import { uuid } from 'uuidv4';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import User from './User';

@Entity('appointments')
class Appointment {
  @PrimaryGeneratedColumn('uuid') // Já faz o this.id = uuid();
  id: string;

  @Column() // Por padrão já é varchar
  provider_id: string;

  // Definir a cardinalidade do relacionamento 1-1, 1-N, N-N, ...
  @ManyToOne(() => User) // Muitos APPOINTMENTS para 1 USER
  @JoinColumn({ name: 'provider_id' }) // Qual usuário identifica o prestador desse agendamento
  provider: User;

  @Column('timestamp with time zone')
  date: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: string;

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
