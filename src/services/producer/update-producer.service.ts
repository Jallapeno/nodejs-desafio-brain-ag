import { Injectable, NotFoundException } from "@nestjs/common";
import { ProducerRepository } from "src/repositories/producer.repository";
import { UpdateProducerDto } from "src/infra/dtos/producer/update-producer-infra.dto";
import { DefaultException } from "src/exception/default.exception";
import { IUpdateProducerService } from "src/interfaces/producer/update-producer.service.interface";

@Injectable()
export class UpdateProducerService implements IUpdateProducerService<UpdateProducerDto> {
  constructor(private readonly producerRepository: ProducerRepository) { }

  async execute(id: number, body: UpdateProducerDto) {
    try {
      const producer = await this.producerRepository.findById(id);
      if (!producer) throw new NotFoundException('Producer not found');
      await this.producerRepository.update({ id, ...body });
      return { message: 'Producer updated successfully' };
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
