import { Test, TestingModule } from "@nestjs/testing";
import { CREATE_PRODUCER_USE_CASE, DELETE_PRODUCER_USE_CASE, UPDATE_PRODUCER_USE_CASE } from "src/constants/constants";
import { ProducerController } from "src/controllers/producer.controller";
import { CreateProducerUseCase } from "src/usecases/producer/create-producer.usecase";
import { DeleteProducerUseCase } from "src/usecases/producer/delete-producer.usecase";
import { UpdateProducerUseCase } from "src/usecases/producer/update-producer.usecase";

describe('ProducerController', () => {
  let controller: ProducerController;
  let createProducerUseCase: CreateProducerUseCase;
  let updateProducerUseCase: UpdateProducerUseCase;
  let deleteProducerUseCase: DeleteProducerUseCase;

  const mockCreateProducerUseCase = {
    execute: jest.fn(),
  }

  const mockUpdateProducerUseCase = {
    execute: jest.fn(),
  }

  const mockDeleteProducerUseCase = {
    execute: jest.fn(),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProducerController],
      providers: [
        {
          provide: CREATE_PRODUCER_USE_CASE,
          useValue: mockCreateProducerUseCase,
        },
        {
          provide: UPDATE_PRODUCER_USE_CASE,
          useValue: mockUpdateProducerUseCase,
        },
        {
          provide: DELETE_PRODUCER_USE_CASE,
          useValue: mockDeleteProducerUseCase,
        },
      ],
    }).compile();

    controller = module.get<ProducerController>(ProducerController);
    createProducerUseCase = module.get<CreateProducerUseCase>(CREATE_PRODUCER_USE_CASE);
    updateProducerUseCase = module.get<UpdateProducerUseCase>(UPDATE_PRODUCER_USE_CASE);
    deleteProducerUseCase = module.get<DeleteProducerUseCase>(DELETE_PRODUCER_USE_CASE);
  })

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createProducer', () => {
    it('should call createProducerUseCase.execute with the correct body', async () => {
      // Arrange
      const body = { name: "Test Producer", cpfCnpj: "12345678901" };
      const expectedResponse = { id: 1, ...body };

      mockCreateProducerUseCase.execute.mockResolvedValue(expectedResponse);

      // Act
      const result = await controller.createProducer(body);

      // Assert
      expect(createProducerUseCase.execute).toHaveBeenCalledWith(body);
      expect(result).toBe(expectedResponse);
    });

    it('should throw an error if createProducerUseCase.execute fails', async () => {
      // Arrange
      const error = new Error('Error creating producer');
      const body = { name: "Test Producer", cpfCnpj: "12345678901" };
      mockCreateProducerUseCase.execute.mockRejectedValue(error);

      // Act & Assert
      await expect(controller.createProducer(body)).rejects.toThrow(error);
    });
  });

  describe('updateProducer', () => {
    it('should call updateProducerUseCase.execute with the correct parameters', async () => {
      // Arrange
      const id = 1;
      const body = { name: "Updated Producer", cpfCnpj: "09876543210" };
      const expectedResponse = { id, ...body };

      mockUpdateProducerUseCase.execute.mockResolvedValue(expectedResponse);

      // Act
      const result = await controller.updateProducer(id, body);

      // Assert
      expect(updateProducerUseCase.execute).toHaveBeenCalledWith(id, body);
      expect(result).toBe(expectedResponse);
    });

    it('should throw an error if updateProducerUseCase.execute fails', async () => {
      // Arrange
      const error = new Error('Error updating producer');
      const id = 1;
      const body = { name: "Updated Producer", cpfCnpj: "09876543210" };
      mockUpdateProducerUseCase.execute.mockRejectedValue(error);

      // Act & Assert
      await expect(controller.updateProducer(id, body)).rejects.toThrow(error);
    });
  });

  describe('deleteProducer', () => {
    it('should call deleteProducerUseCase.execute with the correct id', async () => {
      // Arrange
      const id = 1;
      const expectedResponse = { success: true };

      mockDeleteProducerUseCase.execute.mockResolvedValue(expectedResponse);

      // Act
      const result = await controller.deleteProducer(id);

      // Assert
      expect(deleteProducerUseCase.execute).toHaveBeenCalledWith(id);
      expect(result).toBe(expectedResponse);
    });

    it('should throw an error if deleteProducerUseCase.execute fails', async () => {
      // Arrange
      const error = new Error('Error deleting producer');
      const id = 1;
      mockDeleteProducerUseCase.execute.mockRejectedValue(error);

      // Act & Assert
      await expect(controller.deleteProducer(id)).rejects.toThrow(error);
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
  afterAll(() => {
    jest.restoreAllMocks();
  })
});
