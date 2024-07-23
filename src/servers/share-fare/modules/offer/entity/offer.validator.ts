import { Column, ManyToOne } from 'typeorm';
import { User } from '@share-fare/modules/user';
import { Car } from '@share-fare/modules/car';
import { IsBoolean, IsDate, IsDefined, IsInt, IsString, Length } from 'class-validator';

export class OfferValidator {
  @IsDefined({
    groups: ['create'],
  })
  @Length(1, 250, {
    groups: ['create', 'update'],
  })
  @IsString({
    groups: ['create', 'update'],
  })
  from!: string;

  @IsDefined({
    groups: ['create'],
  })
  @Length(1, 250, {
    groups: ['create', 'update'],
  })
  @IsString({
    groups: ['create', 'update'],
  })
  to!: string;

  @Length(0, 250, {
    groups: ['create', 'update'],
  })
  @IsString({
    groups: ['create', 'update'],
  })
  description?: string | null;

  @IsDefined({
    groups: ['create'],
  })
  time!: Date;

  @IsDefined({
    groups: ['create'],
  })
  @IsBoolean({
    groups: ['create', 'update'],
  })
  is_available!: boolean;

  @IsDefined({
    groups: ['create'],
  })
  @IsBoolean({
    groups: ['create', 'update'],
  })
  is_done!: boolean;

  @IsDefined({
    groups: ['create'],
  })
  @IsInt({
    groups: ['create', 'update'],
  })
  price!: number;

  @IsDefined({
    groups: ['create'],
  })
  @IsInt({
    groups: ['create', 'update'],
  })
  passengers!: number;

  @IsDefined({
    groups: ['create'],
  })
  @IsInt({
    groups: ['create', 'update'],
  })
  max_passengers!: number;
}
