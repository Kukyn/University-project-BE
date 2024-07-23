import express, { RequestHandler } from 'express';
import { CryptoService } from '../services/crypto.service';
import { Authenticable, Server } from '@core/types';
import { Repository } from 'typeorm';
import { HttpCode } from '@core/enums';
import { handleRequest, RequestError } from '@core/utils';
import { decode, JwtPayload, sign, verify } from 'jsonwebtoken';
import { ErrorMessages } from '../enums/error-messages.enum';

export class AuthController {
  server!: Server<any>;
  entity!: Authenticable<any>;
  entityRepository!: Repository<Authenticable<any>>;

  constructor(entity: Authenticable<any>, server: Server<any>) {
    this.server = server;
    this.entityRepository = this.server.db.getRepository(entity);
  }

  refreshToken: RequestHandler = async (req, res, next) => {
    const request = async () => {
      const token = this.getToken(req);
      if (!token) {
        throw new RequestError(HttpCode.Forbidden, ErrorMessages.missingToken);
      }

      const decoded = verify(token, CryptoService.getJWTPrivateKey(), { algorithms: ['RS256'] });
      const newToken = this.generateJWT(decoded);
      //Ta knihovna je úplně naprd, proč to vrací blbej string pořád, potom so musí vše být na prasáka takhle!!
      const expireIn = decode(newToken);
      if (expireIn !== null && typeof expireIn !== 'string') {
        return { code: HttpCode.OK, data: { token: newToken, expire_in: expireIn['exp'] } };
      }

      throw new RequestError(HttpCode.Forbidden, ErrorMessages.missingToken);
    };
    return handleRequest(request, res);
  };

  login: RequestHandler = async (req, res, next) => {
    const request = async () => {
      const entity = await this.entityRepository.findOne({ where: { email: req.body['email'] } });
      if (!entity) {
        throw new RequestError(HttpCode.Forbidden, ErrorMessages.badLoginCredentials);
      }

      const match = await CryptoService.comparePasswords(req.body['password'], entity.password);
      if (match) {
        const token = this.generateJWT(entity);
        //Ta knihovna je úplně naprd, proč to vrací blbej string pořád, potom so musí vše být na prasáka takhle!!
        const expireIn = decode(token);
        delete entity['password'];
        if (expireIn !== null && typeof expireIn !== 'string') {
          return { code: HttpCode.OK, data: { entity: entity, token: token, expire_in: expireIn['exp'] } };
        }
        //Házím tu náhodný error, protože kód se sem nikdy nedostane
        throw new RequestError(HttpCode.Forbidden, ErrorMessages.badLoginCredentials);
      } else {
        throw new RequestError(HttpCode.Forbidden, ErrorMessages.badLoginCredentials);
      }
    };
    return handleRequest(request, res);
  };

  me: RequestHandler = async (req, res, next) => {
    const token = verify(this.getToken(req), CryptoService.getJWTPrivateKey(), { algorithms: ['RS256'] });
    if (typeof token === 'object') {
      const { exp, iat, ...payload } = token;
      return res.status(HttpCode.OK).json(payload);
    }
  };

  generateJWT(entity: Authenticable<any>): string {
    const { exp, iat, password, ...payload } = entity;
    return sign({ ...payload }, CryptoService.getJWTPrivateKey(), { expiresIn: '1h', algorithm: 'RS256' });
  }

  private getToken = (req: any) => {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
      return req.headers.authorization.split(' ')[1];
    }
    return null;
  };
}
