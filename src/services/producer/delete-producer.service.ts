import { Injectable } from "@nestjs/common";
import { DefaultException } from "src/exception/default.exception";
import { IDeleteProducerService } from "src/interfaces/producer/delete-producer.service.interface";
import { ProducerRepository } from "src/repositories/producer.repository";

@Injectable()
export class DeleteProducerService implements IDeleteProducerService<number> {
  constructor(private readonly producerRepository: ProducerRepository) { }

  async execute(id: number) {
    try {
      await this.producerRepository.delete(id);
      return { message: 'Producer deleted successfully' };
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
