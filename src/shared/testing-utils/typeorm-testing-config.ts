import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicoEntity } from 'src/medico/medico.entity/medico.entity';
import { PacienteEntity } from 'src/paciente/paciente.entity/paciente.entity';
import { DiagnosticoEntity } from 'src/diagnostico/diagnostico.entity/diagnostico.entity';
export const TypeOrmTestingConfig = () => [
 TypeOrmModule.forRoot({
   type: 'sqlite',
   database: ':memory:',
   dropSchema: true,
   entities: [MedicoEntity, PacienteEntity, DiagnosticoEntity],
   synchronize: true,
   keepConnectionAlive: true
 }),
 TypeOrmModule.forFeature([MedicoEntity, PacienteEntity, DiagnosticoEntity]),
];