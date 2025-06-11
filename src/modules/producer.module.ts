import { MikroOrmModule } from "@mikro-orm/nestjs";
import { Module } from "@nestjs/common";
import { CREATE_PRODUCER_SERVICE, CREATE_PRODUCER_USE_CASE } from "src/constants/constants";
import { ProducerController } from "src/controllers/producer.controller";
import { Producer } from "src/infra/entities/mikro-orm/producer.entity";
import { ProducerRepository } from "src/repositories/producer.repository";
import { CreateProducerService } from "src/services/producer/create-producer.service";
import { CreateProducerUseCase } from "src/usecases/producer/create-producer.usecase";

const CreateProducerUseCaseProvider = {
  provide: CREATE_PRODUCER_USE_CASE,
  useClass: CreateProducerUseCase
}

const CreateProducerServiceProvider = {
  provide: CREATE_PRODUCER_SERVICE,
  useClass: CreateProducerService
}

@Module({
  imports: [
    MikroOrmModule.forFeature([Producer]),
  ],
  controllers: [ProducerController],
  providers: [
    ProducerRepository,
    CreateProducerUseCaseProvider,
    CreateProducerServiceProvider
  ],
})

export class ProducerModule { }
