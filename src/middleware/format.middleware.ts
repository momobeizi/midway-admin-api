import {IMiddleware} from '@midwayjs/core';
import {Middleware} from '@midwayjs/decorator';
import {Context, NextFunction} from '@midwayjs/koa';
import {ErrorCode} from '../common/ErrorCode';

/**
 * 对接口返回的数据统一包装
 */
@Middleware()
export class FormatMiddleware implements IMiddleware<Context, NextFunction> {
  resolve() {
    return async (ctx: Context, next: NextFunction) => {
      const result = await next();
      return {code: ErrorCode.OK, msg: 'OK', data: result};
    };
  }

  match(ctx) {
    return ctx.path.indexOf('/api') === 0;
  }

  static getName(): string {
    return 'API_RESPONSE_FORMAT';
  }
}
