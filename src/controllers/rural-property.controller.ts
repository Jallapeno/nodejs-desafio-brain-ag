import { Body, Controller, Inject, Patch, Post } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CREATE_RURAL_PROPERTY_USE_CASE, UPDATE_RURAL_PROPERTY_USE_CASE } from "src/constants/constants";
import { CreateRuralPropertyDto } from "src/infra/dtos/rural-property/create-rural-property-infra.dto";
import { UpdateRuralPropertyDto } from "src/infra/dtos/rural-property/update-rural-property-infra.dto";
import { CreateRuralPropertyUseCase } from "src/usecases/rural-property/create-rural-property.usecase";

@Controller("rural-property")
@ApiTags("RuralPropertyController")
export class RuralPropertyController {
  constructor(
    @Inject(CREATE_RURAL_PROPERTY_USE_CASE)
    private readonly _createRuralPropertyUseCase: CreateRuralPropertyUseCase,
    @Inject(UPDATE_RURAL_PROPERTY_USE_CASE)
    private readonly _updateRuralPropertyUseCase: UpdateRuralPropertyUseCase,
    // @Inject(DELETE_RURAL_PROPERTY_USE_CASE)
    // private readonly deleteRuralPropertyUseCase: DeleteRuralPropertyUseCase,
    // @Inject(LIST_RURAL_PROPERTY_BY_PRODUCER_ID_USE_CASE)
    // private readonly listRuralPropertyByProducerIdUseCase: ListRuralPropertyByProducerIdUseCase,
    // @Inject(LIST_RURAL_PROPERTY_BY_ID_USE_CASE)
    // private readonly listRuralPropertyByIdUseCase: ListRuralPropertyByIdUseCase
  ) { }

  @Post()
  @ApiOperation({
    summary: "Create a new rural property",
    description: "Creates a new rural property in the system."
  })
  @ApiResponse({
    status: 201,
    description: "Rural property created successfully."
  })
  @ApiResponse({
    status: 400,
    description: "Bad request. Invalid input data."
  })
  @ApiBody({ type: CreateRuralPropertyDto })
  async createRuralProperty(@Body() body: CreateRuralPropertyDto) {
    return await this._createRuralPropertyUseCase.execute(body);
  }

  @Patch(":id")
  @ApiOperation({
    summary: "Update an existing rural property",
    description: "Updates the details of an existing rural property."
  })
  @ApiResponse({
    status: 200,
    description: "Rural property updated successfully."
  })
  @ApiResponse({
    status: 400,
    description: "Bad request. Invalid input data."
  })
  @ApiBody({ type: UpdateRuralPropertyDto })
  async updateRuralProperty(@Body() body: UpdateRuralPropertyDto) {
    return await this._updateRuralPropertyUseCase.execute(body);
  }
}
