import { RequestHandler } from 'express';
import { Repository } from 'typeorm';
import { Server } from '@core/types';
import { ServerModules } from '../../servers/share-fare/enums/modules.enum';
import { MODULES_ENTITIES } from '../../servers/share-fare/modules/modules';
import { handleRequest } from '@core/utils';
import { RequestError } from '@core/utils';
import { HttpCode } from '@core/enums';
import { ErrorMessages } from '../enums/error-messages.enum';

export type RequestResponse = {
  code: HttpCode;
  data?: any;
  message?: string;
};

export class BaseController {
  server!: Server<any>;
  entityRepository!: Repository<any>;

  constructor(entity: ServerModules, server: Server<any>) {
    this.server = server;
    this.entityRepository = this.server.db.getRepository(MODULES_ENTITIES[entity]);
  }

  getSingle: RequestHandler = async (req, res, next) => {
    const request = async (): Promise<RequestResponse> => {
      const entityId = parseInt(req.params['id']);
      const entity = await this.entityRepository.findOne(
        this.optionsFactory({ entityId: entityId, relationsQuery: req.query['withRelations']?.toString() }),
      ).catch(() => {
        throw new RequestError(HttpCode.NotFound, `${ErrorMessages.entityNotFound}${entityId}`);
      });
      if (Object.keys(entity).find(key => key === 'password')) {
        delete entity.password;
      }
      return { code: HttpCode.OK, data: entity };
    };
    return handleRequest(request, res);
  };

  index: RequestHandler = async (req, res, next) => {
    const request = async () => {
      const entities = await this.entityRepository.find(
        this.optionsFactory({ relationsQuery: req.query['withRelations']?.toString() }),
      );
      if (entities.length > 0) {
        if (Object.keys(entities[0]).find(key => key === 'password')) {
          entities.map(entity => delete entity.password);
        }
      }
      return { code: HttpCode.OK, data: entities };
    };

    return handleRequest(request, res);
  };

  create: RequestHandler = async (req, res, next) => {
    const request = async () => {
      const entity = await this.entityRepository.save(this.entityRepository.create(req.body));
      return { code: HttpCode.Created, data: entity };
    };
    return handleRequest(request, res);
  };

  remove: RequestHandler = async (req, res, next) => {
    const request = async () =>{
      const entityId = parseInt(req.params['id']);
      const response = await this.entityRepository.delete(entityId).catch(
        () =>{
          throw new RequestError(HttpCode.NotFound, `${ErrorMessages.entityNotFound}${entityId}`);
        }
      );
      return { code: HttpCode.OK, data: response };
    }
    return handleRequest(request, res);
  };

  update: RequestHandler = async (req, res, next) => {
    const request = async ()=> {
      const entityId = parseInt(req.params['id']);
      const entity = await this.entityRepository.findOneBy({
        id: entityId,
      }).catch(err=>{
        throw new RequestError(HttpCode.NotFound, `${ErrorMessages.entityNotFound}${entityId}`);
      });
      const updatedEntity = await this.entityRepository.update(entityId, req.body).catch(
        () => {
          throw new RequestError(HttpCode.NotFound, ErrorMessages.updateFailed);
        }
      );
      return { code: HttpCode.OK, data: updatedEntity };
    }
    return handleRequest(request,res);
  };

  optionsFactory(options: { entityId?: number; relationsQuery?: string }) {
    return {
      ...(options.entityId ? { where: { id: options.entityId } } : {}),
      ...(options.relationsQuery ? { relations: options.relationsQuery.split(',') } : {}),
    };
  }
}
