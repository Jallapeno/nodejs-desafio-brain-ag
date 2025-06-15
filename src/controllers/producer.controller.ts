import { Body, Controller, Delete, Inject, Param, Patch, Post } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CREATE_PRODUCER_USE_CASE, DELETE_PRODUCER_USE_CASE, UPDATE_PRODUCER_USE_CASE } from "src/constants/constants";
import { CreateProducerDto } from "src/infra/dtos/producer/create-producer-infra.dto";
import { UpdateProducerDto } from "src/infra/dtos/producer/update-producer-infra.dto";
import { CreateProducerUseCase } from "src/usecases/producer/create-producer.usecase";
import { DeleteProducerUseCase } from "src/usecases/producer/delete-producer.usecase";
import { UpdateProducerUseCase } from "src/usecases/producer/update-producer.usecase";

@Controller("producer")
@ApiTags("ProducerController")
export class ProducerController {
  constructor(
    @Inject(CREATE_PRODUCER_USE_CASE)
    private readonly _createProducerUseCase: CreateProducerUseCase,
    @Inject(UPDATE_PRODUCER_USE_CASE)
    private readonly updateProducerUseCase: UpdateProducerUseCase,
    @Inject(DELETE_PRODUCER_USE_CASE)
    private readonly deleteProducerUseCase: DeleteProducerUseCase,
  ) { }

  @Post()
  @ApiOperation({
    summary: "Create a new producer",
    description: "Creates a new producer in the system."
  })
  @ApiResponse({
    status: 201,
    description: "Producer created successfully."
  })
  @ApiResponse({
    status: 400,
    description: "Bad request. Invalid input data."
  })
  @ApiBody({ type: CreateProducerDto })
  async createProducer(@Body() body: CreateProducerDto) {
    return await this._createProducerUseCase.execute(body);
  }

  @Patch(':id')
  @ApiOperation({ summary: "Update a producer" })
  @ApiBody({ type: UpdateProducerDto })
  async updateProducer(@Param('id') id: number, @Body() body: UpdateProducerDto) {
    return await this.updateProducerUseCase.execute(id, body);
  }

  @Delete(':id')
  @ApiOperation({ summary: "Delete a producer" })
  async deleteProducer(@Param('id') id: number) {
    return await this.deleteProducerUseCase.execute(id);
  }
}
