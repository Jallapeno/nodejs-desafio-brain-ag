import { CreateRuralPropertyDto } from "src/infra/dtos/rural-property/create-rural-property-infra.dto";
import { UpdateRuralPropertyDto } from "src/infra/dtos/rural-property/update-rural-property-infra.dto";

export interface IRuralProperty {
  create(data: CreateRuralPropertyDto): Promise<void>;
  update(data: UpdateRuralPropertyDto): Promise<void>;
  findById(id: number): Promise<any>;
  // delete(id: number): Promise<void>;
  // findByProducerId(producerId: number): Promise<any>;
  // findByProducerCpfCnpj(cpfCnpj: string): Promise<any>;
}
