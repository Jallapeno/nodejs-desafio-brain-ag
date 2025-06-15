import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateRuralPropertyDto {
  @ApiPropertyOptional({ description: 'Farm name', example: 'Fazenda Boa Vista' })
  name?: string;

  @ApiPropertyOptional({ description: 'City', example: 'Uberlândia' })
  city?: string;

  @ApiPropertyOptional({ description: 'State', example: 'MG' })
  state?: string;

  @ApiPropertyOptional({ description: 'Total area (ha)', example: 100 })
  totalArea?: number;

  @ApiPropertyOptional({ description: 'Arable area (ha)', example: 70 })
  arableArea?: number;

  @ApiPropertyOptional({ description: 'Vegetation area (ha)', example: 30 })
  vegetationArea?: number;
}
