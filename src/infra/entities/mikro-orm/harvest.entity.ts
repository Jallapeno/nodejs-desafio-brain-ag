import { Entity, PrimaryKey, Property, OneToMany } from '@mikro-orm/core';
import { PlantedCrop } from './planted-crop.entity';

@Entity()
export class Harvest {
  @PrimaryKey()
  id!: number;

  @Property()
  name!: string; // e.g., "Harvest 2021"

  @OneToMany(() => PlantedCrop, plantedCrop => plantedCrop.harvest)
  plantedCrops = new Array<PlantedCrop>();
}
