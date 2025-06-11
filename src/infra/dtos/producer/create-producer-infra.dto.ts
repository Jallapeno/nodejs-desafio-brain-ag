import { ApiProperty } from '@nestjs/swagger';

export class CreateProducerDto {
  @ApiProperty({
    description: 'Name of the producer',
    example: 'John Doe',
    required: true,
  })
  name: string;

  @ApiProperty({
    description: 'City where the producer is located',
    example: '58453523045',
    required: true,
  })
  cpfCnpj: string;
}
