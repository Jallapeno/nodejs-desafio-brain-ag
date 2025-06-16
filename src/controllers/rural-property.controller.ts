import { Body, Controller, Inject, Post } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CREATE_RURAL_PROPERTY_USE_CASE } from "src/constants/constants";

@Controller("rural-property")
@ApiTags("RuralPropertyController")
export class RuralPropertyController {
  constructor(
    @Inject(CREATE_RURAL_PROPERTY_USE_CASE)
    private readonly _createRuralPropertyUseCase: CreateRuralPropertyUseCase,
    // @Inject(UPDATE_RURAL_PROPERTY_USE_CASE)
    // private readonly updateRuralPropertyUseCase: UpdateRuralPropertyUseCase,
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
  async createRuralProperty(@Body() body: CreateRuralPropertyDto) {
    return await this._createRuralPropertyUseCase.execute(body);
  }
}
