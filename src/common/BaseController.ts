// src/common/BaseController.ts
import { BaseService } from './BaseService';
import { BaseEntity } from './BaseEntity';
import { Body, Post, Query } from '@midwayjs/decorator';

/**
 * Controller基础类，由于类继承不支持装饰类@Post、@Query、@Body等，
 * 所以这里的装饰类不生效，否则实现类就不需要再写多余代码了，
 * 这里保留在这里，以备以后可能会支持继承的装饰类
 */
export abstract class BaseController<T extends BaseEntity> {

  abstract getService(): BaseService<T>;

  @Post('/create')
  async create(@Body() body: T): Promise<T> {
    return this.getService().save(body);
  }

  @Post('/delete')
  async delete(@Query('id') id: number): Promise<boolean> {
    await this.getService().delete(id);
    return true;
  }

  @Post('/update')
  async update(@Body() body: T): Promise<T> {
    return this.getService().save(body);
  }

  @Post('/findById')
  async findById(@Query('id') id: number): Promise<T> {
    return this.getService().findById(id);
  }

  @Post('/findByIds')
  async findByIds(@Query('ids') ids: number[]): Promise<T[]> {
    return this.getService().findByIds(ids);
  }

}
