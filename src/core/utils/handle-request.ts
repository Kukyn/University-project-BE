import { HttpCode } from '@core/enums';
import { RequestError } from './request-error';
import { RequestResponse } from '@core/controllers';
import { HTTP_CODE_TO_TEXT_MAPPER } from './http-code-to-text.mapper';

export async function handleRequest(func: () => Promise<RequestResponse>, res: any): Promise<void> {
  try {
    const x = await func();
    return res.status(x.code).json(x.data ? x.data : { message: x.message });
  } catch (_error: any) {
    let json = {};
    let statusCode = HttpCode.BadRequest;
    if (_error instanceof RequestError) {
      json = {
        error: _error.name,
        error_message: _error.message,
      };
      statusCode = _error.statusCode;
    } else {
      json = {
        error: HTTP_CODE_TO_TEXT_MAPPER[HttpCode.BadRequest],
        error_message: _error.message.replace(/"/g, "'"),
      };
    }

    return res.status(statusCode).json(json);
  }
}
