import { Entity, PrimaryKey, Property, ManyToOne, OneToMany } from '@mikro-orm/core';
import { Producer } from './producer.entity';
import { PlantedCrop } from './planted-crop.entity';

@Entity()
export class RuralProperty {
  @PrimaryKey()
  id!: number;

  @Property()
  name!: string;

  @Property()
  city!: string;

  @Property()
  state!: string;

  @Property()
  totalArea!: number;

  @Property()
  arableArea!: number;

  @Property()
  vegetationArea!: number;

  @ManyToOne(() => Producer)
  producer!: Producer;

  @OneToMany(() => PlantedCrop, plantedCrop => plantedCrop.ruralProperty)
  plantedCrops = new Array<PlantedCrop>();
}
