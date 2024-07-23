import { BaseRouter } from '@core/routers';
import { Server } from '@core/types';
import { ServerModules } from '../../../enums/modules.enum';

export class OfferRouter extends BaseRouter {
  override endpoint = 'offer';
  constructor(server: Server<any>) {
    super(server, ServerModules.Offer);
  }
}
