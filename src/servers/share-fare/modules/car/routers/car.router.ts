import { BaseRouter } from '@core/routers';
import { Server } from '@core/types';
import { CarController } from '../controller';
import { ServerModules } from '../../../enums/modules.enum';

export class CarRouter extends BaseRouter {
  override endpoint = 'car';
  constructor(server: Server<any>) {
    super(server, ServerModules.Car);
  }
}
