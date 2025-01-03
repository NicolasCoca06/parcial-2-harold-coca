import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { PacienteEntity } from '../../paciente/paciente.entity/paciente.entity';

@Entity()
export class DiagnosticoEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nombre: string;

  @Column()
  descripcion: string;

  @ManyToOne(() => PacienteEntity, (paciente) => paciente.diagnosticos)
  paciente: PacienteEntity;
}
