import { Test, TestingModule } from '@nestjs/testing';
import { DefaultException } from 'src/exception/default.exception';
import { ProducerRepository } from 'src/repositories/producer.repository';
import { CreateProducerService } from 'src/services/producer/create-producer.service';

describe('CreateProducerService', () => {
  let service: CreateProducerService;
  let reporsitory: ProducerRepository;

  const mockProducerRepository = {
    create: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateProducerService,
        {
          provide: ProducerRepository,
          useValue: mockProducerRepository,
        },
      ],
    }).compile();

    service = module.get<CreateProducerService>(CreateProducerService);
    reporsitory = module.get<ProducerRepository>(ProducerRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(reporsitory).toBeDefined();
  });

  describe('createProducer', () => {
    const mockCreateProducerDto = { name: "Updated Producer", cpfCnpj: "09876543210" };

    it('should create a producer successfully', async () => {
      mockProducerRepository.create.mockResolvedValue(mockCreateProducerDto);

      await service.execute(mockCreateProducerDto);

      expect(reporsitory.create).toHaveBeenCalledWith(mockCreateProducerDto);
    });

    it('should throw an error if repository throws an error', async () => {
      const mockError = {
        status: 500,
        message: 'Database error',
        errors: ['Error detail'],
      };
      mockProducerRepository.create.mockRejectedValue(mockError);

      await expect(service.execute(mockCreateProducerDto)).rejects.toThrow(
        new DefaultException(
          "Error creating producer",
          mockError.status,
          mockError.message,
          mockError.errors
        )
      );
    });
  })
});
