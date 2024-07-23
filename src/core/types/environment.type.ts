import { Servers } from '@core/enums';
import { DataSourceOptions } from 'typeorm';

export type EnvironmentType = {
  server: ServerEnvironment;
};
export type ServerEnvironment = {
  class: Servers;
  port: number;
  dbOptions: DataSourceOptions;
  jwtSecret: string;
};
