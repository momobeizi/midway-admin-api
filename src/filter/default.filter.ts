// src/filter/default.filter.ts
import { Catch, MidwayHttpError } from '@midwayjs/core';

import {Context} from '@midwayjs/koa';
// import {ErrorCode} from '../common/ErrorCode';

@Catch()
export class DefaultErrorFilter {

  async catch(err: MidwayHttpError, ctx: Context) {
    return {code: err.code, msg: err.message};
  }
}
