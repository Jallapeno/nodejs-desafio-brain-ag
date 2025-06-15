import { IsNotEmpty, IsNumberString, IsString } from "class-validator";

export class CreateProducerDTO {
  @IsNotEmpty({ message: 'Value can`t be empty' })
  @IsString({ each: true, message: 'Value must be a string' })
  name: string;

  @IsNotEmpty({ message: 'Value can`t be empty' })
  @IsNumberString({ no_symbols: true }, { message: 'Value must be a valid CPF or CNPJ' })
  cpfCnpj: string;

  constructor(body) {
    this.name = body.name;
    this.cpfCnpj = body.cpfCnpj;
  }
}
