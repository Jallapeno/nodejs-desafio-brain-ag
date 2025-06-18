import { Inject, Injectable } from "@nestjs/common";
import { LIST_PRODUCER_BY_CPF_CNPJ_SERVICE } from "src/constants/constants";
import { IUseCasePromise } from "src/interfaces/use-case.interface";
import { ListProducerByCpfCnpjService } from "src/services/producer/list-producer-by-cpf-cnpj.service";

@Injectable()
export class ListProducerByCpfCnpjUseCase implements IUseCasePromise<any> {
  constructor(
    @Inject(LIST_PRODUCER_BY_CPF_CNPJ_SERVICE)
    private readonly _listProducerByCpfCnpjService: ListProducerByCpfCnpjService
  ) { }

  async execute(cpfCnpj: string) {
    return await this._listProducerByCpfCnpjService.execute(cpfCnpj);
  }
}
