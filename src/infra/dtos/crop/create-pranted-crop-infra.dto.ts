import { ApiProperty } from '@nestjs/swagger';

export class CreatePlantedCropDto {
  @ApiProperty({ description: 'Rural property ID', example: 1 })
  ruralPropertyId: number;

  @ApiProperty({ description: 'Harvest ID', example: 1 })
  harvestId: number;

  @ApiProperty({ description: 'Crop ID', example: 1 })
  cropId: number;
}
