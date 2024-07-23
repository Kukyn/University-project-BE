import { RequestHandler } from 'express';
import { verify } from 'jsonwebtoken';
import { HttpCode } from '@core/enums';
import { CryptoService } from '../services/crypto.service';
import { ErrorMessages } from '../enums/error-messages.enum';

export const authenticateToken: RequestHandler = (req, res, next) => {
  const getToken = () => {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
      return req.headers.authorization.split(' ')[1];
    }
    return null;
  };
  const token = getToken();

  if (token === null) {
    return res.status(HttpCode.Forbidden).json({ error: ErrorMessages.missingToken });
  }

  verify(token, CryptoService.getJWTPrivateKey(), (err: any) => {
    if (err) {
      return res.status(HttpCode.Forbidden).json({ error: ErrorMessages.wrongToken });
    }
    next();
  });
};
