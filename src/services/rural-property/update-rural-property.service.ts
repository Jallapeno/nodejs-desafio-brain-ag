import { Injectable, NotFoundException } from "@nestjs/common";
import { DefaultException } from "src/exception/default.exception";
import { UpdateRuralPropertyDto } from "src/infra/dtos/rural-property/update-rural-property-infra.dto";
import { IUpdateRuralPropertyService } from "src/interfaces/rural-property/update-rural-property.service.interface";
import { RuralPropertyRepository } from "src/repositories/rural-property.repository";

@Injectable()
export class UpdateRuralPropertyService implements IUpdateRuralPropertyService<UpdateRuralPropertyDto> {
  constructor(
    private readonly _ruralPropertyRepository: RuralPropertyRepository
  ) { }

  async execute(id: number, body: UpdateRuralPropertyDto) {
    const { totalArea, arableArea, vegetationArea } = body;
    if ((arableArea + vegetationArea) > totalArea) {
      throw new Error(
        'The sum of arable area and vegetation area cannot exceed the total area of the farm.'
      );
    }
    try {
      const ruralProperty = await this._ruralPropertyRepository.findById(id);
      if (!ruralProperty) throw new NotFoundException('Rural property not found');
      await this._ruralPropertyRepository.update({ id, ...body });
    } catch (error) {
      throw new DefaultException(
        "Error updating rural property",
        error.status,
        error.message,
        error.errors
      );
    }
  }
}
