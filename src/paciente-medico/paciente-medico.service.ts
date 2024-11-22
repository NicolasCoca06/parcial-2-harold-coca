import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MedicoEntity } from 'src/medico/medico.entity/medico.entity';
import { PacienteEntity } from 'src/paciente/paciente.entity/paciente.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PacienteService {
  constructor(
    @InjectRepository(PacienteEntity)
    private readonly pacienteRepository: Repository<PacienteEntity>,
    @InjectRepository(MedicoEntity)
    private readonly medicoRepository: Repository<MedicoEntity>,
  ) {}

  async addMedicoToPaciente(pacienteId: string, medicoId: string): Promise<PacienteEntity> {
    const paciente = await this.pacienteRepository.findOne({ where: { id: pacienteId } });
    const medico = await this.medicoRepository.findOne({ where: { id: medicoId } });

    if (!medico) {
      throw new NotFoundException('Médico no encontrado');
    }

    if (!paciente.medicos) {
      paciente.medicos = [];
    }

    if (paciente.medicos.length >= 5) {
      throw new BadRequestException('El paciente ya tiene 5 médicos asignados');
    }

    paciente.medicos.push(medico);
    return await this.pacienteRepository.save(paciente);
  }
}
