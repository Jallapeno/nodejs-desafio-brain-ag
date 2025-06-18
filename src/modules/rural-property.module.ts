import { MikroOrmModule } from "@mikro-orm/nestjs";
import { Module } from "@nestjs/common";
import { CREATE_RURAL_PROPERTY_USE_CASE, CREATE_RURAL_PROPERTY_SERVICE, UPDATE_RURAL_PROPERTY_USE_CASE, UPDATE_RURAL_PROPERTY_SERVICE } from "src/constants/constants";
import { RuralPropertyController } from "src/controllers/rural-property.controller";
import { RuralProperty } from "src/infra/entities/mikro-orm/rural-property.entity";
import { RuralPropertyRepository } from "src/repositories/rural-property.repository";
import { CreateRuralPropertyService } from "src/services/rural-property/create-rural-property.service";
import { UpdateRuralPropertyService } from "src/services/rural-property/update-rural-property.service";
import { CreateRuralPropertyUseCase } from "src/usecases/rural-property/create-rural-property.usecase";
import { UpdateRuralPropertyUseCase } from "src/usecases/rural-property/update-rural-property.usecase";

const RuralPropertyUseCaseProvider = {
  provide: CREATE_RURAL_PROPERTY_USE_CASE,
  useClass: CreateRuralPropertyUseCase
}

const RuralPropertyServiceProvider = {
  provide: CREATE_RURAL_PROPERTY_SERVICE,
  useClass: CreateRuralPropertyService
}

const UpdateRuralPropertyUseCaseProvider = {
  provide: UPDATE_RURAL_PROPERTY_USE_CASE,
  useClass: UpdateRuralPropertyUseCase
}

const UpdateRuralPropertyServiceProvider = {
  provide: UPDATE_RURAL_PROPERTY_SERVICE,
  useClass: UpdateRuralPropertyService
}

@Module({
  imports: [
    MikroOrmModule.forFeature([RuralProperty]),
  ],
  controllers: [RuralPropertyController],
  providers: [
    RuralPropertyRepository,
    RuralPropertyUseCaseProvider,
    RuralPropertyServiceProvider,
    UpdateRuralPropertyUseCaseProvider,
    UpdateRuralPropertyServiceProvider
  ],
  exports: [],
})

export class RuralPropertyModule { }
