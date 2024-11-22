import { Test, TestingModule } from '@nestjs/testing';
import { PacienteService } from './paciente.service';
import { PacienteEntity } from './paciente.entity/paciente.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BadRequestException } from '@nestjs/common';

describe('PacienteService', () => {
  let service: PacienteService;
  let repository: Repository<PacienteEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PacienteService,
        {
          provide: getRepositoryToken(PacienteEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<PacienteService>(PacienteService);
    repository = module.get<Repository<PacienteEntity>>(getRepositoryToken(PacienteEntity));
  });

  it('debería crear un paciente correctamente', async () => {
    // Mock del resultado esperado
    const pacienteData = { nombre: 'Juan', genero: 'Masculino' } as PacienteEntity;
    const savedPaciente = { id: '1', ...pacienteData };

    jest.spyOn(repository, 'save').mockResolvedValue(savedPaciente);

    const result = await service.create(pacienteData);

    expect(result).toEqual(savedPaciente);
    expect(repository.save).toHaveBeenCalledWith(pacienteData);
  });

  it('debería lanzar una excepción si el nombre tiene menos de 3 caracteres', async () => {
    const pacienteData = { nombre: 'Jo', genero: 'Masculino' } as PacienteEntity;

    await expect(service.create(pacienteData)).rejects.toThrow(BadRequestException);
  });
});

