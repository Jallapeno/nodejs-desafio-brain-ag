import { Inject, Injectable } from "@nestjs/common";
import { validateOrReject } from "class-validator";
import { CREATE_RURAL_PROPERTY_SERVICE } from "src/constants/constants";
import { CreateRuralPropertyDto } from "src/infra/dtos/rural-property/create-rural-property-infra.dto";
import { IUseCasePromise } from "src/interfaces/use-case.interface";

@Injectable()
export class CreateRuralPropertyUseCase implements IUseCasePromise<any> {
  constructor(
    @Inject(CREATE_RURAL_PROPERTY_SERVICE)
    private readonly _createRuralPropertyService: CreateRuralPropertyService
  ) { }

  async execute(body: CreateRuralPropertyDto): Promise<any> {
    const _validatedBody = body; // Perform validation if necessary
    await validateOrReject(_validatedBody);
    const result = await this._createRuralPropertyService.execute(body);
    return result;
  }
}
