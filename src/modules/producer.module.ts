import { MikroOrmModule } from "@mikro-orm/nestjs";
import { Module } from "@nestjs/common";
import { CREATE_PRODUCER_SERVICE, CREATE_PRODUCER_USE_CASE, DELETE_PRODUCER_SERVICE, DELETE_PRODUCER_USE_CASE, LIST_PRODUCER_BY_CPF_CNPJ_SERVICE, LIST_PRODUCER_BY_CPF_CNPJ_USE_CASE, UPDATE_PRODUCER_SERVICE, UPDATE_PRODUCER_USE_CASE } from "src/constants/constants";
import { ProducerController } from "src/controllers/producer.controller";
import { Producer } from "src/infra/entities/mikro-orm/producer.entity";
import { ProducerRepository } from "src/repositories/producer.repository";
import { CreateProducerService } from "src/services/producer/create-producer.service";
import { DeleteProducerService } from "src/services/producer/delete-producer.service";
import { ListProducerByCpfCnpjService } from "src/services/producer/list-producer-by-cpf-cnpj.service";
import { UpdateProducerService } from "src/services/producer/update-producer.service";
import { CreateProducerUseCase } from "src/usecases/producer/create-producer.usecase";
import { DeleteProducerUseCase } from "src/usecases/producer/delete-producer.usecase";
import { ListProducerByCpfCnpjUseCase } from "src/usecases/producer/list-producer-by-cpf-cnpj.usecase";
import { UpdateProducerUseCase } from "src/usecases/producer/update-producer.usecase";

const CreateProducerUseCaseProvider = {
  provide: CREATE_PRODUCER_USE_CASE,
  useClass: CreateProducerUseCase
}

const CreateProducerServiceProvider = {
  provide: CREATE_PRODUCER_SERVICE,
  useClass: CreateProducerService
}

const UpdateProducerUseCaseProvider = {
  provide: UPDATE_PRODUCER_USE_CASE,
  useClass: UpdateProducerUseCase
}

const UpdateProducerServiceProvider = {
  provide: UPDATE_PRODUCER_SERVICE,
  useClass: UpdateProducerService
}

const DeleteProducerUseCaseProvider = {
  provide: DELETE_PRODUCER_USE_CASE,
  useClass: DeleteProducerUseCase
}

const DeleteProducerServiceProvider = {
  provide: DELETE_PRODUCER_SERVICE,
  useClass: DeleteProducerService
}

const ListProducerByCpfCnpjUseCaseProvider = {
  provide: LIST_PRODUCER_BY_CPF_CNPJ_USE_CASE,
  useClass: ListProducerByCpfCnpjUseCase
}

const ListProducerByCpfCnpjServiceProvider = {
  provide: LIST_PRODUCER_BY_CPF_CNPJ_SERVICE,
  useClass: ListProducerByCpfCnpjService
}

@Module({
  imports: [
    MikroOrmModule.forFeature([Producer]),
  ],
  controllers: [ProducerController],
  providers: [
    ProducerRepository,
    CreateProducerUseCaseProvider,
    CreateProducerServiceProvider,
    UpdateProducerUseCaseProvider,
    UpdateProducerServiceProvider,
    DeleteProducerUseCaseProvider,
    DeleteProducerServiceProvider,
    ListProducerByCpfCnpjUseCaseProvider,
    ListProducerByCpfCnpjServiceProvider
  ],
})

export class ProducerModule { }
