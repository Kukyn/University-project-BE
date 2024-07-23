import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { Server } from '@core/types';
import { User } from '@share-fare/modules/user';
import { authenticateToken } from '@core/middlewares';

export class AuthRouter {
  endpoint: string = 'auth';
  controller: AuthController;
  router: Router = Router();

  constructor(server: Server<any>) {
    this.controller = new AuthController(User, server);
    this.router.get('/refresh', authenticateToken, this.controller.refreshToken);
    this.router.post('/login', this.controller.login);
    this.router.get('/me', this.controller.me);
  }
}
