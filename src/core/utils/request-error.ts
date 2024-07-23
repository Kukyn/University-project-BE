import { HttpCode } from '@core/enums';
import { HTTP_CODE_TO_TEXT_MAPPER } from './http-code-to-text.mapper';

export class RequestError extends Error {
  public readonly name: string;
  public readonly statusCode: HttpCode = HttpCode.BadRequest;
  public readonly message: string;

  constructor(statusCode: HttpCode, message: string) {
    super(message);
    this.name = HTTP_CODE_TO_TEXT_MAPPER[statusCode];
    this.statusCode = statusCode;
    this.message = message;
  }
}
