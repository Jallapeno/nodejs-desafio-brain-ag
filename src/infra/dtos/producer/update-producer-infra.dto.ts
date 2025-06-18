import { ApiProperty } from '@nestjs/swagger';
import { Validate } from 'class-validator';
import { IsCpfOrCnpj } from 'src/validators/is-cpf-or-cnpj.validator';

export class UpdateProducerDto {
  @ApiProperty({ description: 'Producer name', example: 'John Doe' })
  name: string;

  @ApiProperty({ description: 'CPF or CNPJ', example: '58453523045' })
  @Validate(IsCpfOrCnpj)
  cpfCnpj: string;
}
