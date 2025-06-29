import { BadRequestException, Injectable } from "@nestjs/common";
import { DefaultException } from "src/exception/default.exception";
import { CreateRuralPropertyDto } from "src/infra/dtos/rural-property/create-rural-property-infra.dto";
import { ICreateRuralPropertyService } from "src/interfaces/rural-property/create-rural-property.service.interface";
import { RuralPropertyRepository } from "src/repositories/rural-property.repository";

@Injectable()
export class CreateRuralPropertyService implements ICreateRuralPropertyService<CreateRuralPropertyDto> {

  constructor(
    private readonly _ruralPropertyRepository: RuralPropertyRepository
  ) { }

  async execute(body: CreateRuralPropertyDto) {
    const { totalArea, arableArea, vegetationArea } = body;
    if ((arableArea + vegetationArea) > totalArea) {
      throw new BadRequestException(
        'The sum of arable area and vegetation area cannot exceed the total area of the farm.'
      );
    }
    try {
      await this._ruralPropertyRepository.create(body);
    } catch (error) {
      throw new DefaultException(
        "Error creating rural property",
        error.status,
        error.message,
        error.errors
      );
    }
  }

}
