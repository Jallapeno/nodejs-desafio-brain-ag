import { Entity, PrimaryKey, ManyToOne } from '@mikro-orm/core';
import { RuralProperty } from './rural-property.entity';
import { Harvest } from './harvest.entity';
import { Crop } from './crop.entity';

@Entity()
export class PlantedCrop {
  @PrimaryKey()
  id!: number;

  @ManyToOne(() => RuralProperty)
  ruralProperty!: RuralProperty;

  @ManyToOne(() => Harvest)
  harvest!: Harvest;

  @ManyToOne(() => Crop)
  crop!: Crop;
}
