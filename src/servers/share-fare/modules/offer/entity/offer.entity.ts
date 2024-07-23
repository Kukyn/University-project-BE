import { BeforeInsert, Column, Entity, ManyToOne } from 'typeorm';
import { User } from '../../user';
import { Car } from '../../car';
import { BaseEntity } from '@core/entities';
import { OfferValidator } from './offer.validator';
import { ulid } from 'ulid';

@Entity('Offers')
export class Offer extends BaseEntity {
  static validator = OfferValidator;

  @Column({
    type: 'varchar',
    length: 250,
    nullable: false,
  })
  from!: string;

  @Column({
    type: 'varchar',
    length: 250,
    nullable: false,
  })
  to!: string;

  @Column({
    type: 'varchar',
    length: 250,
    nullable: false,
  })
  description?: string | null;

  @Column({
    type: 'datetime',
    nullable: false,
  })
  time!: Date;

  @Column({
    type: 'boolean',
    default: true,
    nullable: false,
  })
  is_available!: boolean;

  @Column({
    type: 'boolean',
    default: false,
    nullable: false,
  })
  is_done!: boolean;

  @Column({
    type: 'int',
    nullable: false,
  })
  price!: number;

  @Column({
    type: 'int',
    nullable: false,
    default: 0,
  })
  passengers!: number;

  @Column({
    type: 'int',
    nullable: false,
  })
  max_passengers!: number;

  @ManyToOne(() => User, user => user.offers)
  created_by!: User;

  @ManyToOne(() => Car, car => car.offers)
  car!: Car;

  @BeforeInsert()
  setULID() {
    this.ulid = ulid();
  }
}
