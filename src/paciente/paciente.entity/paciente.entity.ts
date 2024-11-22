import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, OneToMany } from 'typeorm';
import { MedicoEntity } from '../../medico/medico.entity/medico.entity';
import { DiagnosticoEntity } from '../../diagnostico/diagnostico.entity/diagnostico.entity';

@Entity()
export class PacienteEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nombre: string;

  @Column()
  genero: string;

  @ManyToMany(() => MedicoEntity, (medico) => medico.pacientes)
  medicos: MedicoEntity[];

  @OneToMany(() => DiagnosticoEntity, (diagnostico) => diagnostico.paciente)
  diagnosticos: DiagnosticoEntity[];
}
