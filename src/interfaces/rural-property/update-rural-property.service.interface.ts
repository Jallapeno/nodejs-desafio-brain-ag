export interface IUpdateRuralPropertyService<UpdateRuralPropertyDto> {
  execute(id: number, body: UpdateRuralPropertyDto)
}
