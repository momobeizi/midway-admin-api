import { BaseEntity } from '../BaseEntity';
import { Column, Entity } from "typeorm";

@Entity('user')
export class UserEntity extends BaseEntity {
  @Column({ length: 20, unique: true })
  username: string;

  @Column({ length: 200 })
  password: string;

  @Column({ length: 20 })
  phone: string;

  @Column({ length: 20, unique: true })
  name: string;

  @Column({ length: 20 })
  email: string;

  @Column({ length: 200 })
  avatar: string;

  @Column({ type: 'int', default: 1 })
  status: number;
}
