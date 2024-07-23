import { Entity, Column, OneToMany, BeforeInsert } from 'typeorm';
import { Car } from '../../car';
import { Offer } from '../../offer';
import { ulid } from 'ulid';
import { BaseAuthenticableEntity } from '@core/entities';
import { UserValidator } from './user.validator';

@Entity('Users')
export class User extends BaseAuthenticableEntity {
  @Column({
    type: 'varchar',
    length: 100,
    nullable: false,
  })
  first_name!: string;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: false,
  })
  last_name!: string;

  @Column({
    type: 'boolean',
    nullable: false,
  })
  is_admin!: boolean;

  @Column({
    type: 'varchar',
    length: 18,
    nullable: false,
  })
  phone_number!: string;

  @OneToMany(() => Car, car => car.owner)
  cars!: Car[];

  @OneToMany(() => Offer, offer => offer.created_by)
  offers!: Offer[];

  @BeforeInsert()
  setULID() {
    this.ulid = ulid();
  }

  static validator = UserValidator;
}
