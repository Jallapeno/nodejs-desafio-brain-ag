import { HttpException, HttpStatus } from '@nestjs/common';

export type HttpValidationExceptionResponse = {
  errors: Array<any>;
};

export class ValidateException extends HttpException {
  constructor(validationErrors: any[]) {
    const _httpValidationExceptionResponse: HttpValidationExceptionResponse = {
      errors: [],
    };

    (validationErrors || []).forEach((validationError: any) => {
      _httpValidationExceptionResponse.errors.push({
        property: validationError.property,
        value: validationError.value,
        errors: validationError.errors,
        constraints: validationError.constraints,
      });
    });

    super(_httpValidationExceptionResponse, HttpStatus.BAD_REQUEST);
  }
}
