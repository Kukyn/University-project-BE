import { Column } from 'typeorm';
import { BaseEntity } from './base.entity';

export class BaseAuthenticableEntity extends BaseEntity {
  @Column({
    type: 'varchar',
    length: 100,
    nullable: false,
  })
  email!: string;

  @Column({
    type: 'varchar',
    length: 128,
    nullable: false,
  })
  password!: string;
}
