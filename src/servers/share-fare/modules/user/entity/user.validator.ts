import { IsDefined, IsEmail, IsString, Length } from 'class-validator';

export class UserValidator {
  @IsDefined({
    groups: ['create'],
  })
  @Length(2, 100, {
    groups: ['create', 'update'],
  })
  @IsString({
    groups: ['create', 'update'],
  })
  first_name!: string;

  @IsDefined({
    groups: ['create'],
  })
  @Length(2, 100, {
    groups: ['create', 'update'],
  })
  @IsString({
    groups: ['create', 'update'],
  })
  last_name!: string;

  @IsDefined({
    groups: ['create'],
  })
  @Length(5, 18, {
    groups: ['create', 'update'],
  })
  @IsString({
    groups: ['create', 'update'],
  })
  phone_number!: string;

  @IsDefined({
    groups: ['create'],
  })
  is_admin!: boolean;

  @IsDefined({
    groups: ['create'],
  })
  @Length(6, 100, {
    groups: ['create', 'update'],
  })
  @IsEmail(
    {},
    {
      groups: ['create', 'update'],
    },
  )
  email!: string;

  @IsDefined({
    groups: ['create'],
  })
  @Length(8, 128, {
    groups: ['create', 'update'],
  })
  @IsString({
    groups: ['create', 'update'],
  })
  password!: string;
}
