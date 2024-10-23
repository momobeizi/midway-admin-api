// src/common/BaseService.ts
import { In, Repository } from 'typeorm';
import { BaseEntity } from './BaseEntity';
import { FindOptionsWhere } from 'typeorm/find-options/FindOptionsWhere';

export abstract class BaseService<T extends BaseEntity> {

  abstract getModel(): Repository<T>;

  async save(o: T) {
    if (!o.id) o.id = new Date().getTime();
    return this.getModel().save(o);
  }

  async delete(id: number) {
    return this.getModel().delete(id);
  }

  async findById(id: number): Promise<T> {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return this.getModel().findOneBy({ id });
  }

  async findByIds(ids: number[]): Promise<T[]> {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return this.getModel().findBy({ id: In(ids) });
  }

  async findOne(where: FindOptionsWhere<T>): Promise<T> {
    return this.getModel().findOne({ where });
  }

}
