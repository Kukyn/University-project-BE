import { Servers } from '@core/enums';
import { EnvironmentType } from '@core/types';

export const Environment: EnvironmentType = {
  server: {
    class: Servers.ShareFare,
    port: 8080,
    dbOptions: {
      type: 'mysql',
      host: '',
      username: '',
      password: '',
      database: '',
    },
    jwtSecret:
      '',
  },
};
