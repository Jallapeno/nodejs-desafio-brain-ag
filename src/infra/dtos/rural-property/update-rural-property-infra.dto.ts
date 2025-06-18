import { ApiProperty } from '@nestjs/swagger';

export class UpdateRuralPropertyDto {
  @ApiProperty({ description: 'Farm name', example: 'Fazenda Boa Vista' })
  name: string;

  @ApiProperty({ description: 'City', example: 'Uberlândia' })
  city: string;

  @ApiProperty({ description: 'State', example: 'MG' })
  state: string;

  @ApiProperty({ description: 'Total area (ha)', example: 100 })
  totalArea: number;

  @ApiProperty({ description: 'Arable area (ha)', example: 70 })
  arableArea: number;

  @ApiProperty({ description: 'Vegetation area (ha)', example: 30 })
  vegetationArea: number;
}
