import { Body, Controller, Inject, Post } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CREATE_PRODUCER_USE_CASE } from "src/constants/constants";
import { CreateProducerDto } from "src/infra/dtos/producer/create-producer-infra.dto";
import { CreateProducerUseCase } from "src/usecases/producer/create-producer.usecase";

@Controller("producer")
@ApiTags("ProducerController")
export class ProducerController {
  constructor(
    @Inject(CREATE_PRODUCER_USE_CASE)
    private readonly _createProducerUseCase: CreateProducerUseCase
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
}
