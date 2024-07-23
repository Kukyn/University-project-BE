import { BaseServer } from '@core/servers';
import { ServerEnvironment } from '@core/types';

export class ShareFare extends BaseServer {
  name: string = 'ShareFare';
  port: number = 8080;

  constructor(server: ServerEnvironment) {
    super(server);
  }
}
