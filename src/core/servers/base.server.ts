import express, { Express } from 'express';
import { MODULES_ENTITIES, MODULES_ROUTERS } from '../../servers/share-fare/modules/modules';
import { DataSource } from 'typeorm';
import { ServerEnvironment } from '@core/types';
import { routerInjector } from '@core/utils';
import { CORE_ROUTERS } from '../core-routers';
import cookieParser from 'cookie-parser';
import cors from 'cors';

export abstract class BaseServer {
  abstract name: string;
  port: number;
  server!: Express;
  db!: DataSource;
  corsOptions = {
    origin: 'http://localhost:4200',
    credentials: true,
  };

  constructor(server: ServerEnvironment) {
    this.db = new DataSource(server.dbOptions);
    this.db.setOptions({ entities: MODULES_ENTITIES });
    this.db.setOptions({ synchronize: false });
    this.port = server.port;
    this.server = express();
    this.server.use(express.json());
    this.server.use(cookieParser());
    this.server.use(cors(this.corsOptions));
    this.loadModules();
  }

  private loadModules(): void {
    routerInjector(CORE_ROUTERS, this);
    routerInjector(MODULES_ROUTERS, this);
  }
}
