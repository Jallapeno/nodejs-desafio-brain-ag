import { Injectable } from "@nestjs/common";
import { DefaultException } from "src/exception/default.exception";
import { IListByCpfCnpjProducerService } from "src/interfaces/producer/list-producer-by-cpf-cnpj.service.interface";
import { ProducerRepository } from "src/repositories/producer.repository";

@Injectable()
export class ListProducerByCpfCnpjService implements IListByCpfCnpjProducerService<string> {
  constructor(private readonly producerRepository: ProducerRepository) { }

  async execute(cpfCnpj: string) {
    try {
      return await this.producerRepository.findByCpfCnpj(cpfCnpj);
    } catch (error) {
      throw new DefaultException(
        "Error listing producer by CPF/CNPJ",
        error.status,
        error.message,
        error.errors
      )
    }
  }
}
