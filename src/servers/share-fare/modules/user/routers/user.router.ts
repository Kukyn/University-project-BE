import { BaseRouter } from '@core/routers';
import { Server } from '@core/types';
import { ServerModules } from '../../../enums/modules.enum';
import { bodyValidator } from '@core/middlewares';
import { User } from '../entity';
import { ValidatorGroup } from '@core/enums';

export class UserRouter extends BaseRouter {
  override endpoint = 'user';
  constructor(server: Server<any>) {
    super(server, ServerModules.User);
    //Prasárna, ale snad funguje
    this.router.stack.find(x => x.route.methods.post === true).route.stack.shift();
    this.router.post('/', bodyValidator(User, ValidatorGroup.create), this.controller.create);
  }
}
