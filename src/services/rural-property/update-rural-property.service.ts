import { Injectable } from "@nestjs/common";
import { UpdateRuralPropertyDto } from "src/infra/dtos/rural-property/update-rural-property-infra.dto";
import { IUpdateRuralPropertyService } from "src/interfaces/rural-property/update-rural-property.service.interface";
import { RuralPropertyRepository } from "src/repositories/rural-property.repository";

@Injectable()
export class UpdateRuralPropertyService implements IUpdateRuralPropertyService<UpdateRuralPropertyDto> {
  constructor(
    private readonly _ruralPropertyRepository: RuralPropertyRepository
  ) { }

  async execute(body: UpdateRuralPropertyDto) {
    const { totalArea, arableArea, vegetationArea } = body;
    if ((arableArea + vegetationArea) > totalArea) {
      throw new Error(
        'The sum of arable area and vegetation area cannot exceed the total area of the farm.'
      );
    }
    try {
      await this._ruralPropertyRepository.update(body);
    } catch (error) {
      throw new Error(
        "Error updating rural property: " + error.message
      );
    }
  }
}
