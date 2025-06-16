import { InjectRepository } from "@mikro-orm/nestjs";
import { EntityRepository } from "@mikro-orm/postgresql";
import { Injectable } from "@nestjs/common";
import { RuralProperty } from "src/infra/entities/mikro-orm/rural-property.entity";
import { IRuralProperty } from "src/infra/interfaces/rural-property/rural-property.repoditory.interface";

@Injectable()
export class RuralPropertyRepository implements IRuralProperty {
  constructor(
    @InjectRepository(RuralProperty)
    private readonly ruralPropertyRepository: EntityRepository<RuralProperty>,
  ) { }

  async create(data: any): Promise<void> {
    const ruralProperty = this.ruralPropertyRepository.getEntityManager().create(RuralProperty, data);
    await this.ruralPropertyRepository.getEntityManager().persistAndFlush(ruralProperty);
  }
}
