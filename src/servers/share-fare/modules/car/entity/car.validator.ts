import { IsDefined, IsNumber, IsString, Length } from 'class-validator';
import { IsNull } from 'typeorm';

export class CarValidator {
  @IsDefined({
    groups: ['create'],
  })
  @Length(2, 100, {
    groups: ['create', 'update'],
  })
  @IsString({
    groups: ['create', 'update'],
  })
  brand!: string;

  @IsDefined({
    groups: ['create'],
  })
  @Length(2, 100, {
    groups: ['create', 'update'],
  })
  @IsString({
    groups: ['create', 'update'],
  })
  model!: string;

  @IsDefined({
    groups: ['create'],
  })
  @Length(2, 10, {
    groups: ['create', 'update'],
  })
  @IsString({
    groups: ['create', 'update'],
  })
  spz!: string;

  @IsDefined({
    groups: ['create'],
  })
  @Length(2, 20, {
    groups: ['create', 'update'],
  })
  @IsString({
    groups: ['create', 'update'],
  })
  color!: string;

  @IsDefined({
    groups: ['create'],
  })
  @IsNumber()
  owner!: number;
}
