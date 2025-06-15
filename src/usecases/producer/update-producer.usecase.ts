import { Inject, Injectable } from "@nestjs/common";
import { UPDATE_PRODUCER_SERVICE } from "src/constants/constants";
import { UpdateProducerDto } from "src/infra/dtos/producer/update-producer-infra.dto";
import { UpdateProducerService } from "src/services/producer/update-producer.service";

@Injectable()
export class UpdateProducerUseCase {
  constructor(
    @Inject(UPDATE_PRODUCER_SERVICE)
    private readonly _updateProducerService: UpdateProducerService
  ) { }

  async execute(id: number, body: UpdateProducerDto) {
    return await this._updateProducerService.execute(id, body);
  }
}
