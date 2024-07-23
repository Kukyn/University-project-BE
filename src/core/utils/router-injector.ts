import { Server } from '@core/types';

export function routerInjector(routers: { new (...args: any[]): any }[], server: Server<any>): void {
  routers.forEach(_module => {
    const module = Reflect.construct(_module, [server]);
    server.server.use(`/api/${module.endpoint}`, module.router);
  });
}
