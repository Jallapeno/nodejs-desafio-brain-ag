import { Migration } from '@mikro-orm/migrations';

export class Migration20250611051136 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "crop" ("id" serial primary key, "name" varchar(255) not null);`);

    this.addSql(`create table "harvest" ("id" serial primary key, "name" varchar(255) not null);`);

    this.addSql(`create table "producer" ("id" serial primary key, "name" varchar(255) not null, "cpf_cnpj" varchar(255) not null);`);
    this.addSql(`alter table "producer" add constraint "producer_cpf_cnpj_unique" unique ("cpf_cnpj");`);

    this.addSql(`create table "rural_property" ("id" serial primary key, "name" varchar(255) not null, "city" varchar(255) not null, "state" varchar(255) not null, "total_area" int not null, "arable_area" int not null, "vegetation_area" int not null, "producer_id" int not null);`);

    this.addSql(`create table "planted_crop" ("id" serial primary key, "rural_property_id" int not null, "harvest_id" int not null, "crop_id" int not null);`);

    this.addSql(`alter table "rural_property" add constraint "rural_property_producer_id_foreign" foreign key ("producer_id") references "producer" ("id") on update cascade;`);

    this.addSql(`alter table "planted_crop" add constraint "planted_crop_rural_property_id_foreign" foreign key ("rural_property_id") references "rural_property" ("id") on update cascade;`);
    this.addSql(`alter table "planted_crop" add constraint "planted_crop_harvest_id_foreign" foreign key ("harvest_id") references "harvest" ("id") on update cascade;`);
    this.addSql(`alter table "planted_crop" add constraint "planted_crop_crop_id_foreign" foreign key ("crop_id") references "crop" ("id") on update cascade;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "planted_crop" drop constraint "planted_crop_crop_id_foreign";`);

    this.addSql(`alter table "planted_crop" drop constraint "planted_crop_harvest_id_foreign";`);

    this.addSql(`alter table "rural_property" drop constraint "rural_property_producer_id_foreign";`);

    this.addSql(`alter table "planted_crop" drop constraint "planted_crop_rural_property_id_foreign";`);

    this.addSql(`drop table if exists "crop" cascade;`);

    this.addSql(`drop table if exists "harvest" cascade;`);

    this.addSql(`drop table if exists "producer" cascade;`);

    this.addSql(`drop table if exists "rural_property" cascade;`);

    this.addSql(`drop table if exists "planted_crop" cascade;`);
  }

}
