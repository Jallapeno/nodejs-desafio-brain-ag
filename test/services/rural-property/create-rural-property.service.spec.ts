import { Test, TestingModule } from '@nestjs/testing';
import { RuralPropertyRepository } from 'src/repositories/rural-property.repository';
import { CreateRuralPropertyService } from 'src/services/rural-property/create-rural-property.service';

describe('RuralPropertyService', () => {
  let service: CreateRuralPropertyService;
  let repository: RuralPropertyRepository;

  const mockRuralPropertyRepository = {
    createRuralProperty: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateRuralPropertyService,
        {
          provide: RuralPropertyRepository,
          useValue: mockRuralPropertyRepository,
        },
      ],
    }).compile();

    service = module.get<CreateRuralPropertyService>(CreateRuralPropertyService);
    repository = module.get<RuralPropertyRepository>(RuralPropertyRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });

  describe('createRuralProperty', () => {
    // Arrange
    const mockCreateRuralPropertyDto = {
      name: 'Test Property',
      city: 'Test City',
      state: 'TS',
      totalArea: 100,
      arableArea: 70,
      vegetationArea: 30,
      producer: 1,
    };

    it('should create a rural property successfully', async () => {
      mockRuralPropertyRepository.createRuralProperty.mockResolvedValue(mockCreateRuralPropertyDto);

      const result = await service.execute(mockCreateRuralPropertyDto);

      expect(result).toEqual(mockCreateRuralPropertyDto);
      expect(mockRuralPropertyRepository.createRuralProperty).toHaveBeenCalledWith(mockCreateRuralPropertyDto);
    });

    it('should throw an error if the sum of arable area and vegetation area exceeds total area', async () => {
      const invalidDto = {
        name: 'Invalid Property',
        city: 'Invalid City',
        state: 'IV',
        totalArea: 100,
        arableArea: 80,
        vegetationArea: 30,
        producer: 1,
      };

      await expect(service.execute(invalidDto)).rejects.toThrow(
        'The sum of arable area and vegetation area cannot exceed the total area of the farm.'
      );
    });

    it('should throw an error if repository throws an error', async () => {
      const errorMessage = 'Database error';
      mockRuralPropertyRepository.createRuralProperty.mockRejectedValue(new Error(errorMessage));

      await expect(service.execute(mockCreateRuralPropertyDto)).rejects.toThrow(
        new Error(`Error creating rural property: ${errorMessage}`)
      );
    });
  });
});

