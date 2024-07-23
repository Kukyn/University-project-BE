import { BaseController } from '@core/controllers';
import { Server } from '@core/types';
import { RequestHandler } from 'express';
import { CryptoService } from '../../../../../core/services/crypto.service';
import { ServerModules } from '../../../enums/modules.enum';
import { handleRequest, RequestError } from '@core/utils';
import { HttpCode } from '@core/enums';
import { ErrorMessages } from '../../../../../core/enums/error-messages.enum';

export class UserController extends BaseController {
  constructor(server: Server<any>) {
    super(ServerModules.User, server);
  }

  override create: RequestHandler = async (req, res, next) => {
    const request = async () => {
      const emailExist = !!(await this.entityRepository.findOne({ where: { email: req.body['email'] } }));
      if (emailExist) {
        throw new RequestError(HttpCode.BadRequest, ErrorMessages.userAlreadyExist);
      }
      req.body['password'] = await CryptoService.hashPassword(req.body['password']);
      const entity = await this.entityRepository.save(this.entityRepository.create(req.body));
      const { password, ...entityWithoutPassword } = entity;
      return { code: HttpCode.Created, data: entityWithoutPassword };
    };
    return handleRequest(request, res);
  };
}
