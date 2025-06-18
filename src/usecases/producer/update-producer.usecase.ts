import { Inject, Injectable } from "@nestjs/common";
import { UPDATE_PRODUCER_SERVICE } from "src/constants/constants";
import { UpdateProducerDto } from "src/infra/dtos/producer/update-producer-infra.dto";
import { IUseCasePromise } from "src/interfaces/use-case.interface";
import { UpdateProducerService } from "src/services/producer/update-producer.service";

@Injectable()
export class UpdateProducerUseCase implements IUseCasePromise<any> {
  constructor(
    @Inject(UPDATE_PRODUCER_SERVICE)
    private readonly _updateProducerService: UpdateProducerService
  ) { }

  async execute(id: number, body: UpdateProducerDto) {
    return await this._updateProducerService.execute(id, body);
  }
}
