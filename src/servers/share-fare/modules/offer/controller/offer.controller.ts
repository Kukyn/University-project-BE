import { BaseController } from '@core/controllers';
import { Server } from '@core/types';
import { ServerModules } from '../../../enums/modules.enum';

export class OfferController extends BaseController {
  constructor(server: Server<any>) {
    super(ServerModules.Offer, server);
  }
}
