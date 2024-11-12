import {Column, CreateDateColumn, PrimaryColumn, UpdateDateColumn} from 'typeorm';

export class BaseEntity {
  @PrimaryColumn({type: 'bigint', comment: 'id主键'})
  id: string;

  @Column({nullable: true, comment: '更新人id'})
  updaterId: string | null;

  @Column({nullable: true, comment: '创建人id'})
  creatorId: string | null;

  @CreateDateColumn({comment: '创建时间'})
  createTime: Date;

  @UpdateDateColumn({comment: '更新时间'})
  updateTime: Date;
}
