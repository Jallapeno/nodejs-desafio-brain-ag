import { ValidationError } from '@nestjs/common';
import { validate } from 'class-validator';
import { ValidateException } from 'src/exception/validate.exception';

export type HttpValidationExceptionResponse = {
  errors: Array<any>;
};

async function processValidationErrors(
  errors: ValidationError[],
  parentProperty = '',
): Promise<any[]> {
  const errorDetails = [];

  for (const error of errors) {
    if (error.children && error.children.length > 0) {
      const childErrors = await processValidationErrors(
        error.children,
        error.property,
      );
      errorDetails.push({
        property: error.property,
        errors: childErrors,
      });
    } else {
      parentProperty ? `${parentProperty}.${error.property}` : error.property;
      errorDetails.push({
        indice: parentProperty,
        property: error.property,
        constraints: error.constraints,
      });
    }
  }

  return errorDetails;
}

export async function validateOrReject(dto: any) {
  if (Object.keys(dto).length > 0) {
    const validationErrors = await validate(dto, {
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
      whitelist: true,
    });
    if (validationErrors.length > 0) {
      const errors = [];

      for (const error of validationErrors) {
        if (error.children && error.children.length > 0) {
          const childErrors = await processValidationErrors(
            error.children,
            error.property,
          );
          errors.push({
            property: error.property,
            errors: childErrors,
          });
        } else {
          errors.push({
            property: error.property,
            constraints: error.constraints,
          });
        }
      }

      throw new ValidateException(errors);
    }
  }
}
