import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Validate } from 'class-validator';
import { IsCpfOrCnpj } from 'src/validators/is-cpf-or-cnpj.validator';

export class CreateProducerDto {
  @ApiProperty({ description: 'Producer name', example: 'John Doe' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'CPF or CNPJ', example: '58453523045' })
  @IsNotEmpty()
  @Validate(IsCpfOrCnpj)
  cpfCnpj: string;
}
