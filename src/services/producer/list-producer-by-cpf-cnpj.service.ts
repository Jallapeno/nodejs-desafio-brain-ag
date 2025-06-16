import { Injectable } from "@nestjs/common";
import { DefaultException } from "src/exception/default.exception";
import { ProducerRepository } from "src/repositories/producer.repository";

@Injectable()
export class ListProducerByCpfCnpjService {
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
