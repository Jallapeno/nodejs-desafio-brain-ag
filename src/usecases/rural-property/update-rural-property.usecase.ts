import { Inject, Injectable } from "@nestjs/common";
import { validateOrReject } from "class-validator";
import { UPDATE_RURAL_PROPERTY_SERVICE } from "src/constants/constants";
import { UpdateRuralPropertyDTO } from "src/dtos/rural-property/update-rural-property.dto";
import { UpdateRuralPropertyDto } from "src/infra/dtos/rural-property/update-rural-property-infra.dto";
import { IUseCasePromise } from "src/interfaces/use-case.interface";
import { UpdateRuralPropertyService } from "src/services/rural-property/update-rural-property.service";

@Injectable()
export class UpdateRuralPropertyUseCase implements IUseCasePromise<any> {
  constructor(
    @Inject(UPDATE_RURAL_PROPERTY_SERVICE)
    private readonly _updateRuralPropertyService: UpdateRuralPropertyService
  ) { }

  async execute(body: UpdateRuralPropertyDto): Promise<any> {
    const _validatedBody = new UpdateRuralPropertyDTO(body);
    await validateOrReject(_validatedBody);
    const result = await this._updateRuralPropertyService.execute(body);
    return result;
  }
}
