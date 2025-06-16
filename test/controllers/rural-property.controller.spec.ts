import { Test, TestingModule } from "@nestjs/testing";
import { CREATE_RURAL_PROPERTY_USE_CASE } from "src/constants/constants";
import { RuralPropertyController } from "src/controllers/rural-property.controller";
import { CreateRuralPropertyUseCase } from "src/usecases/rural-property/create-rural-property.usecase";

describe('RuralPropertyController', () => {
  let controller: RuralPropertyController;
  let createRuralPropertyUseCase: CreateRuralPropertyUseCase;
  // let updateRuralPropertyUseCase: UpdateRuralPropertyUseCase;
  // let deleteRuralPropertyUseCase: DeleteRuralPropertyUseCase;

  const mockCreateRuralPropertyUseCase = {
    execute: jest.fn(),
  };

  // const mockUpdateRuralPropertyUseCase = {
  //   execute: jest.fn(),
  // };

  // const mockDeleteRuralPropertyUseCase = {
  //   execute: jest.fn(),
  // };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RuralPropertyController],
      providers: [
        {
          provide: CREATE_RURAL_PROPERTY_USE_CASE,
          useValue: mockCreateRuralPropertyUseCase,
        },
        // {
        //   provide: UPDATE_RURAL_PROPERTY_USE_CASE,
        //   useValue: mockUpdateRuralPropertyUseCase,
        // },
        // {
        // provide: DELETE_RURAL_PROPERTY_USE_CASE,
        // useValue: mockDeleteRuralPropertyUseCase,
        // },
      ]
    }).compile();

    controller = module.get<RuralPropertyController>(RuralPropertyController);
    createRuralPropertyUseCase = module.get<CreateRuralPropertyUseCase>(CREATE_RURAL_PROPERTY_USE_CASE);
    // updateRuralPropertyUseCase = module.get<UpdateRuralPropertyUseCase>(UPDATE_RURAL_PROPERTY_USE_CASE);
    // deleteRuralPropertyUseCase = module.get<DeleteRuralPropertyUseCase>(DELETE_RURAL_PROPERTY_USE_CASE);
  })


  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createRuralProperty', () => {
    const ruralPropertyDtoBody = {
      name: 'Test Property',
      city: 'Test City',
      state: 'Test State',
      totalArea: 100,
      arableArea: 80,
      vegetationArea: 20,
      producerId: 1,
      plantedCrops: []
    };
    it('should create a rural property', async () => {
      const expectedResponse = { id: 1, ...ruralPropertyDtoBody };

      mockCreateRuralPropertyUseCase.execute.mockResolvedValue(expectedResponse);

      // Act
      const result = await controller.createRuralProperty(ruralPropertyDtoBody);

      // Assert
      expect(createRuralPropertyUseCase.execute).toHaveBeenCalledWith(ruralPropertyDtoBody);
      expect(result).toBe(expectedResponse);
    });

    it('should throw an error if createRuralPropertyUseCase.execute fails', async () => {
      const error = new Error('Error creating rural property');

      mockCreateRuralPropertyUseCase.execute.mockRejectedValue(error);

      // Act & Assert
      await expect(controller.createRuralProperty(ruralPropertyDtoBody)).rejects.toThrow(error);
    })
  });

})
