import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { PacienteEntity } from '../../paciente/paciente.entity/paciente.entity';

@Entity()
export class MedicoEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nombre: string;

  @Column()
  especialidad: string;

  @Column()
  telefono: string;

  @ManyToMany(() => PacienteEntity, (paciente) => paciente.medicos)
  @JoinTable() // Necesario para relaciones bidireccionales en ManyToMany
  pacientes: PacienteEntity[];
}
