import { Router } from 'express';
import { Server } from '@core/types';
import { bodyValidator } from '@core/middlewares';
import { ValidatorGroup } from '@core/enums';
import { MODULES_CONTROLLERS, MODULES_ENTITIES } from '../../servers/share-fare/modules/modules';
import { ServerModules } from '../../servers/share-fare/enums/modules.enum';
import { BaseController } from '@core/controllers';
import { authenticateToken } from '@core/middlewares';

export class BaseRouter {
  endpoint!: string;
  controller!: BaseController;
  router: Router = Router();

  protected constructor(server: Server<any>, entity: ServerModules) {
    this.controller = new MODULES_CONTROLLERS[entity](server);
    this.router.get('/', authenticateToken, this.controller.index);
    this.router.get('/:id', authenticateToken, this.controller.getSingle);
    this.router.post(
      '/',
      authenticateToken,
      bodyValidator(MODULES_ENTITIES[entity], ValidatorGroup.create),
      this.controller.create,
    );
    this.router.patch(
      '/:id',
      authenticateToken,
      bodyValidator(MODULES_ENTITIES[entity], ValidatorGroup.update),
      this.controller.update,
    );
    this.router.delete('/:id', authenticateToken, this.controller.remove);
  }
}
