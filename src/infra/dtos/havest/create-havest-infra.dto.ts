import { ApiProperty } from '@nestjs/swagger';

export class CreateHarvestDto {
  @ApiProperty({ description: 'Harvest name', example: 'Harvest 2021' })
  name: string;
}
