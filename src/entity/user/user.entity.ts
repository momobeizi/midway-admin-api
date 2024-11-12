import {BaseEntity} from '../BaseEntity';
import {Column, Entity} from "typeorm";

@Entity('user')
export class UserEntity extends BaseEntity {
  @Column({length: 20, unique: true, comment: '用户名'})
  username: string;

  @Column({length: 200, comment: '密码'})
  password: string;

  @Column({length: 20, comment: '手机号'})
  phone: string;

  @Column({length: 20, unique: true, comment: '昵称'})
  name: string;

  @Column({length: 20, comment: '邮箱'})
  email: string;

  @Column({length: 200, comment: '头像'})
  avatar: string;

  @Column({type: 'int', default: 1, comment: '是否激活：0停用，1启用'})
  status: number;
}
