import { HttpException } from '@nestjs/common';

export class DefaultException extends HttpException {
  constructor(name: string, status: number, message: string, errors: any) {
    super(message, status);
    this.name = name;
    this.errors = errors;
  }
  errors: any;
}
