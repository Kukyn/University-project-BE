import { User, UserController, UserRouter } from './user';
import { Offer } from './offer';
import { Car, CarController } from './car';
import { CarRouter } from '@share-fare/modules/car';
import { OfferRouter } from './offer/routers';
import { OfferController } from './offer/controller';

export const MODULES_ROUTERS = [UserRouter, CarRouter, OfferRouter];
export const MODULES_ENTITIES = [User, Car, Offer];
export const MODULES_CONTROLLERS = [UserController, CarController, OfferController];
