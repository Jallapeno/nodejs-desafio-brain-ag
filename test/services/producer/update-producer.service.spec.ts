import { Test, TestingModule } from '@nestjs/testing';
import { DefaultException } from 'src/exception/default.exception';
import { ProducerRepository } from 'src/repositories/producer.repository';
import { UpdateProducerService } from 'src/services/producer/update-producer.service';

describe('UpdateProducerService', () => {
  let service: UpdateProducerService;
  let repository: ProducerRepository;

  const mockProducerRepository = {
    update: jest.fn(),
    findById: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateProducerService,
        {
          provide: ProducerRepository,
          useValue: mockProducerRepository,
        },
      ],
    }).compile();

    service = module.get<UpdateProducerService>(UpdateProducerService);
    repository = module.get<ProducerRepository>(ProducerRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });

  describe('updateProducer', () => {
    const mockUpdateProducerDto = { name: 'Updated Producer', cpfCnpj: '09876543210' };

    it('should update a producer successfully', async () => {
      mockProducerRepository.findById.mockResolvedValue(mockUpdateProducerDto);
      mockProducerRepository.update.mockResolvedValue(mockUpdateProducerDto);

      await service.execute(1, mockUpdateProducerDto);

      expect(repository.update).toHaveBeenCalledWith({ id: 1, ...mockUpdateProducerDto });
    });

    it('should throw an error if the repository throws an error', async () => {
      const mockError = {
        status: 500,
        message: 'Database error',
        errors: ['Error detail'],
      };
      mockProducerRepository.update.mockRejectedValue(mockError);

      await expect(service.execute(1, mockUpdateProducerDto)).rejects.toThrow(
        new DefaultException(
          "Error updating producer",
          mockError.status,
          mockError.message,
          mockError.errors
        )
      );
    });
  });
})
