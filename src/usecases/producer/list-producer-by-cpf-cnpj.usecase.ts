import { Inject, Injectable } from "@nestjs/common";
import { LIST_PRODUCER_BY_CPF_CNPJ_SERVICE } from "src/constants/constants";
import { ListProducerByCpfCnpjService } from "src/services/producer/list-producer-by-cpf-cnpj.service";

@Injectable()
export class ListProducerByCpfCnpjUseCase {
  constructor(
    @Inject(LIST_PRODUCER_BY_CPF_CNPJ_SERVICE)
    private readonly _listProducerByCpfCnpjService: ListProducerByCpfCnpjService
  ) { }

  async execute(cpfCnpj: string) {
    return await this._listProducerByCpfCnpjService.execute(cpfCnpj);
  }
}
