import { Injectable } from "@nestjs/common";
import { DefaultException } from "src/exception/default.exception";
import { CreateProducerDto } from "src/infra/dtos/producer/create-producer-infra.dto";
import { ICreateProducerService } from "src/interfaces/producer/create-producer.service.interface";
import { ProducerRepository } from "src/repositories/producer.repository";

@Injectable()
export class CreateProducerService implements ICreateProducerService<CreateProducerDto> {

  constructor(
    private readonly _producerRepository: ProducerRepository
  ) { }

  async execute(body: CreateProducerDto) {
    try {
      await this._producerRepository.create(body);
    } catch (error) {
      throw new DefaultException(
        "Error creating producer",
        error.status,
        error.message,
        error.errors
      )
    }
  }
}
