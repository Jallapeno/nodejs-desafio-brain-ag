import { Inject, Injectable } from "@nestjs/common";
import { DELETE_PRODUCER_SERVICE } from "src/constants/constants";
import { DeleteProducerService } from "src/services/producer/delete-producer.service";

@Injectable()
export class DeleteProducerUseCase {
  constructor(
    @Inject(DELETE_PRODUCER_SERVICE)
    private readonly _deleteProducerService: DeleteProducerService // Replace with actual type
  ) { }

  async execute(id: number) {
    return await this._deleteProducerService.execute(id);
  }
}
