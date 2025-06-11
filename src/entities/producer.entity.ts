import { Entity, PrimaryKey, Property, OneToMany } from '@mikro-orm/core';
import { RuralProperty } from './rural-property.entity';

@Entity()
export class Producer {
  @PrimaryKey()
  id!: number;

  @Property()
  name!: string;

  @Property({ unique: true })
  cpfCnpj!: string;

  @OneToMany(() => RuralProperty, ruralProperty => ruralProperty.producer)
  ruralProperties = new Array<RuralProperty>();
}
