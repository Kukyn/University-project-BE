import { HttpCode } from '@core/enums';

export const HTTP_CODE_TO_TEXT_MAPPER = {
  [HttpCode.OK]: 'OK',
  [HttpCode.Created]: 'Created',
  [HttpCode.Accepted]: 'Accepted',
  [HttpCode.BadRequest]: 'Bad Request',
  [HttpCode.Unauthorized]: 'Unauthorized',
  [HttpCode.Forbidden]: 'Forbidden',
  [HttpCode.NotFound]: 'Not Found',
  [HttpCode.NotImplemented]: 'Not Implemented',
};
