import { Test, TestingModule } from '@nestjs/testing';
import { DefaultException } from 'src/exception/default.exception';
import { RuralPropertyRepository } from 'src/repositories/rural-property.repository';
import { UpdateRuralPropertyService } from 'src/services/rural-property/update-rural-property.service';

describe('UpdateRuralPropertyService', () => {
  let service: UpdateRuralPropertyService;
  let repository: RuralPropertyRepository;

  const mockRuralPropertyRepository = {
    update: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateRuralPropertyService,
        {
          provide: RuralPropertyRepository,
          useValue: mockRuralPropertyRepository,
        },
      ],
    }).compile();

    service = module.get<UpdateRuralPropertyService>(UpdateRuralPropertyService);
    repository = module.get<RuralPropertyRepository>(RuralPropertyRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });

  describe('updateRuralProperty', () => {
    // Arrange
    const mockUpdateRuralPropertyDto = {
      id: 1,
      name: 'Updated Property',
      city: 'Updated City',
      state: 'US',
      totalArea: 100,
      arableArea: 70,
      vegetationArea: 30,
    };

    it('should update a rural property successfully', async () => {
      mockRuralPropertyRepository.update.mockResolvedValue(mockUpdateRuralPropertyDto);

      await service.execute(mockUpdateRuralPropertyDto);

      expect(repository.update).toHaveBeenCalledWith(mockUpdateRuralPropertyDto);
    });

    it('should throw an error if the sum of arable area and vegetation area exceeds total area', async () => {
      const invalidDto = {
        ...mockUpdateRuralPropertyDto,
        arableArea: 80,
        vegetationArea: 30,
      };

      await expect(service.execute(invalidDto)).rejects.toThrow(
        new Error('The sum of arable area and vegetation area cannot exceed the total area of the farm.')
      );
    });

    it('should throw an error if repository throws an error', async () => {
      const mockError = {
        status: 500,
        message: 'Database error',
        errors: ['Error detail'],
      };
      mockRuralPropertyRepository.update.mockRejectedValue(mockError);

      await expect(service.execute(mockUpdateRuralPropertyDto)).rejects.toThrow(
        new DefaultException(
          "Error updating rural property",
          mockError.status,
          mockError.message,
          mockError.errors
        )
      );
    });
  });
});
