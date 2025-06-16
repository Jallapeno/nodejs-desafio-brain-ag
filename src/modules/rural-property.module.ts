import { MikroOrmModule } from "@mikro-orm/nestjs";
import { Module } from "@nestjs/common";
import { CREATE_RURAL_PROPERTY_USE_CASE, CREATE_RURAL_PROPERTY_SERVICE } from "src/constants/constants";
import { RuralPropertyController } from "src/controllers/rural-property.controller";
import { RuralProperty } from "src/infra/entities/mikro-orm/rural-property.entity";
import { CreateRuralPropertyService } from "src/services/rural-property/create-rural-property.service";
import { CreateRuralPropertyUseCase } from "src/usecases/rural-property/create-rural-property.usecase";

const RuralPropertyUseCaseProvider = {
  provide: CREATE_RURAL_PROPERTY_USE_CASE,
  useClass: CreateRuralPropertyUseCase
}

const RuralPropertyServiceProvider = {
  provide: CREATE_RURAL_PROPERTY_SERVICE,
  useClass: CreateRuralPropertyService
}

@Module({
  imports: [
    MikroOrmModule.forFeature([RuralProperty]),
  ],
  controllers: [RuralPropertyController],
  providers: [
    RuralPropertyUseCaseProvider,
    RuralPropertyServiceProvider
  ],
  exports: [],
})

export class RuralPropertyModule { }
