import https from 'https';
import fs from 'fs';
import path from 'path';
import { Server } from '@core/types';
import { SERVERS } from './servers/servers';
import { Environment } from '../enviroments/local.environment';

const SERVER: Server<any> = Reflect.construct(SERVERS[Environment.server.class], [Environment.server]);

const SSL_SERVER = https.createServer(
  {
    key: fs.readFileSync(path.join(__dirname, '..', 'crypto', 'cert', 'key.pem')),
    cert: fs.readFileSync(path.join(__dirname, '..', 'crypto', 'cert', 'cert.pem')),
  },
  SERVER.server,
);

SERVER.db
  .initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
    SSL_SERVER.listen(SERVER.port, () => console.log(`${SERVER.name} is running on port ${SERVER.port}`));
  })
  .catch((err: any) => {
    console.error('Error during Data Source initialization', err);
    process.exit(1);
  });
