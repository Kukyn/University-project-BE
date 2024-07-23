import { RequestHandler } from 'express';
import { validate, ValidationError } from 'class-validator';
import { HttpCode, ValidatorGroup } from '@core/enums';
import { plainToInstance } from 'class-transformer';
import { HTTP_CODE_TO_TEXT_MAPPER } from '@core/utils';

export function bodyValidator<T>(
  model: { new (): any } & {
    validator: any;
  },
  validatorGroup?: ValidatorGroup,
): RequestHandler {
  const options = {
    ...(validatorGroup ? { groups: [validatorGroup] } : {}),
    validationError: { target: false },
  };
  return (req, res, next) => {
    validate(plainToInstance(model.validator, req.body), options).then(errors => {
      if (errors.length > 0) {
        return res.status(HttpCode.BadRequest).json({
          error: HTTP_CODE_TO_TEXT_MAPPER[HttpCode.BadRequest],
          error_type: 'Malformed or missing body',
          errors: parseErrors(errors),
        });
      }
      next();
    });
  };
}

function parseErrors(errors: ValidationError[]) {
  return errors.map(error => {
    if (!error.constraints) {
      return {};
    }
    return {
      [error.property]: {
        values: error.value,
        errors: Object.values(error.constraints),
      },
    };
  });
}
