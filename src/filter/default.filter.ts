// src/filter/default.filter.ts
import { Catch } from '@midwayjs/decorator';
import { Context } from '@midwayjs/koa';
import { ErrorCode } from '../common/ErrorCode';

@Catch()
export class DefaultErrorFilter {

  async catch(err: Error, ctx: Context) {
    return { code: ErrorCode.UN_ERROR, msg: err.message };
  }

}
