import { Entity, PrimaryKey, Property, OneToMany } from '@mikro-orm/core';
import { PlantedCrop } from './planted-crop.entity';

@Entity()
export class Crop {
  @PrimaryKey()
  id!: number;

  @Property()
  name!: string; // e.g., "Soybean", "Corn", "Coffee"

  @OneToMany(() => PlantedCrop, plantedCrop => plantedCrop.crop)
  plantedCrops = new Array<PlantedCrop>();
}
