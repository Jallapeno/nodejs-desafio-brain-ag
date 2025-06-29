import { CreateProducerDto } from "src/infra/dtos/producer/create-producer-infra.dto";
import { UpdateProducerDto } from "src/infra/dtos/producer/update-producer-infra.dto";

export interface IProducer {
  create(data: CreateProducerDto): Promise<void>;
  update(data: UpdateProducerDto): Promise<void>;
  findById(id: number): Promise<any>;
  delete(id: number): Promise<void>;
  findByCpfCnpj(cpfCnpj: string): Promise<any>;
}
