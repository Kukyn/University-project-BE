import { User, UserValidator } from '@share-fare/modules/user';
import { ServerModules } from './enums/modules.enum';

export const ENDPOINT_TO_ENTITY = {
  [ServerModules.User]: User,
};
