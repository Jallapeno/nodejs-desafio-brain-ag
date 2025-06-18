import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateRuralPropertyDTO {
  @IsNotEmpty({ message: 'Farm name cannot be empty' })
  @IsString({ message: 'Farm name must be a string' })
  name: string;

  @IsNotEmpty({ message: 'City cannot be empty' })
  @IsString({ message: 'City must be a string' })
  city: string;

  @IsNotEmpty({ message: 'State cannot be empty' })
  @IsString({ message: 'State must be a string' })
  state: string;

  @IsNotEmpty({ message: 'Total area cannot be empty' })
  @IsNumber({}, { message: 'Total area must be a number' })
  totalArea: number;

  @IsNotEmpty({ message: 'Arable area cannot be empty' })
  @IsNumber({}, { message: 'Arable area must be a number' })
  arableArea: number;

  @IsNotEmpty({ message: 'Vegetation area cannot be empty' })
  @IsNumber({}, { message: 'Vegetation area must be a number' })
  vegetationArea: number;

  @IsNotEmpty({ message: 'Producer ID cannot be empty' })
  @IsNumber({}, { message: 'Producer ID must be a number' })
  producer: number;

  constructor(body: CreateRuralPropertyDTO) {
    this.name = body.name;
    this.city = body.city;
    this.state = body.state;
    this.totalArea = body.totalArea;
    this.arableArea = body.arableArea;
    this.vegetationArea = body.vegetationArea;
    this.producer = body.producer;
  }
}
