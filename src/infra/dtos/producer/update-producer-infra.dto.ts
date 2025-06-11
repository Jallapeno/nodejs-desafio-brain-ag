import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, Validate } from 'class-validator';
import { IsCpfOrCnpj } from 'src/validators/is-cpf-or-cnpj.validator';

export class UpdateProducerDto {
  @ApiPropertyOptional({ description: 'Producer name', example: 'John Doe' })
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({ description: 'CPF or CNPJ', example: '58453523045' })
  @IsOptional()
  @Validate(IsCpfOrCnpj)
  cpfCnpj?: string;
}
