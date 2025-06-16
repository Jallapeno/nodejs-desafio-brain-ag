import { Injectable } from "@nestjs/common";
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/core';
import { IProducer } from "src/infra/interfaces/producer/producer.repository.interface";
import { Producer } from "src/infra/entities/mikro-orm/producer.entity";

@Injectable()
export class ProducerRepository implements IProducer {
  constructor(
    @InjectRepository(Producer)
    private readonly producerRepository: EntityRepository<Producer>,
  ) { }

  async create(data: any): Promise<void> {
    const producer = this.producerRepository.getEntityManager().create(Producer, data);
    await this.producerRepository.getEntityManager().persistAndFlush(producer);
  }

  async update(data: any): Promise<void> {
    await this.producerRepository.nativeUpdate({ id: data.id }, data);
  }

  async findById(id: number): Promise<Producer | null> {
    return this.producerRepository.findOne({ id });
  }

  async delete(id: number): Promise<void> {
    const producer = await this.producerRepository.findOne({ id });
    if (producer) {
      await this.producerRepository.getEntityManager().removeAndFlush(producer);
    }
  }

  async findByCpfCnpj(cpfCnpj: string): Promise<Producer | null> {
    return this.producerRepository.findOne({ cpfCnpj });
  }
}
