import { Inject, Injectable } from "@nestjs/common";
import { validateOrReject } from "class-validator";
import { CREATE_PRODUCER_SERVICE } from "src/constants/constants";
import { CreateProducerDTO } from "src/dtos/producer/create-producer.dto";
import { CreateProducerDto } from "src/infra/dtos/producer/create-producer-infra.dto";
import { IUseCasePromise } from "src/interfaces/use-case.interface";
import { CreateProducerService } from "src/services/producer/create-producer.service";

@Injectable()
export class CreateProducerUseCase implements IUseCasePromise<any> {
  constructor(
    @Inject(CREATE_PRODUCER_SERVICE)
    private readonly _createProducerService: CreateProducerService
  ) { }

  async execute(body: CreateProducerDto): Promise<any> {
    const _validatedBody = new CreateProducerDTO(body);
    await validateOrReject(_validatedBody);
    const result = await this._createProducerService.execute(body);
    return result;
  }
}
