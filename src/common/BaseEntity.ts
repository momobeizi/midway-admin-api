import { Column, CreateDateColumn, PrimaryColumn, UpdateDateColumn } from 'typeorm';

export class BaseEntity {
  @PrimaryColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'bigint' })
  updaterId: number;

  @Column({ type: 'bigint' })
  createrId: number;

  @CreateDateColumn()
  createTime: Date;

  @UpdateDateColumn()
  updateTime: Date;
}
