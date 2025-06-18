export interface IUpdateProducerService<UpdateProducerDto> {
  execute(id: number, body: UpdateProducerDto);
}
