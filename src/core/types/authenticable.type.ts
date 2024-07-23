import { BaseAuthenticableEntity } from '@core/entities';

export type Authenticable<T extends BaseAuthenticableEntity> = T;
