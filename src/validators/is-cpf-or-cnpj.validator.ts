import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';
import { cpf, cnpj } from 'cpf-cnpj-validator';

@ValidatorConstraint({ name: 'isCpfOrCnpj', async: false })
export class IsCpfOrCnpj implements ValidatorConstraintInterface {
  validate(text: string, _args: ValidationArguments) {
    return cpf.isValid(text) || cnpj.isValid(text); // true se for CPF ou CNPJ válido
  }
  defaultMessage(_args: ValidationArguments) {
    return 'CPF or CNPJ is invalid';
  }
}
