import { Inject, Injectable } from "@nestjs/common";
import { DELETE_PRODUCER_SERVICE } from "src/constants/constants";
import { IUseCasePromise } from "src/interfaces/use-case.interface";
import { DeleteProducerService } from "src/services/producer/delete-producer.service";

@Injectable()
export class DeleteProducerUseCase implements IUseCasePromise<any> {
  constructor(
    @Inject(DELETE_PRODUCER_SERVICE)
    private readonly _deleteProducerService: DeleteProducerService
  ) { }

  async execute(id: number) {
    return await this._deleteProducerService.execute(id);
  }
}
