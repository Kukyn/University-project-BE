import { BeforeInsert, Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { CarType } from '../enums';
import { User } from '../../user';
import { Offer } from '../../offer';
import { BaseEntity } from '@core/entities';
import { ulid } from 'ulid';
import { CarValidator } from './car.validator';

@Entity('Cars')
export class Car extends BaseEntity {
  static validator = CarValidator;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: false,
  })
  brand!: string;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: false,
  })
  model!: string;

  @Column({
    type: 'varchar',
    length: 10,
    nullable: false,
  })
  spz!: string;

  @Column({
    type: 'varchar',
    length: 20,
    nullable: false,
  })
  color!: string;

  @Column({
    type: 'enum',
    enum: CarType,
    nullable: false,
  })
  type!: CarType;

  @ManyToOne(() => User, user => user.cars)
  owner!: User;

  @OneToMany(() => Offer, offer => offer.car)
  offers!: Offer[];

  @BeforeInsert()
  setULID() {
    this.ulid = ulid();
  }
}
