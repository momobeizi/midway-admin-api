import {IMiddleware, Middleware} from '@midwayjs/core';
import {Context, NextFunction} from '@midwayjs/koa';
import moment = require("moment");

@Middleware()
export class ReportMiddleware implements IMiddleware<Context, NextFunction> {
  resolve() {
    return async (ctx: Context, next: NextFunction) => {
      // 记录入参时间和入参
      const startTime = moment();
      console.log(
        '------------------------------------请求开始------------------------------------'
      );
      console.log(`请求开始时间：${startTime.format('YYYY-MM-DD HH:mm:ss')}`);
      console.log(`接口地址：${ctx.path}`);
      console.log(`Params参数：Params:${JSON.stringify(ctx.request.query)}`); // GET 参数
      console.log(`Body参数:${JSON.stringify(ctx.request.body)}`); // POST/PUT/PATCH 等请求体

      ctx.logger.info(
        '------------------------------------请求开始------------------------------------'
      );
      ctx.logger.info(
        `请求开始时间：${startTime.format('YYYY-MM-DD HH:mm:ss')}`
      );
      ctx.logger.info(`接口地址：${ctx.path}`);
      ctx.logger.info(
        `Params参数：Params:${JSON.stringify(ctx.request.query)}`
      );
      ctx.logger.info(`Body参数:${JSON.stringify(ctx.request.body)}`);

      // 执行下一个中间件或路由处理
      await next();
      // 如果有响应体，记录返参和返回参数时间
      if (ctx.response) {
        const endTime = moment();
        console.log(`返回结果:${JSON.stringify(ctx.response.body)}`);
        console.log(`接口耗时: ${endTime.diff(startTime, 'milliseconds')}ms`);
        console.log(`请求结束时间: ${endTime.format('YYYY-MM-DD HH:mm:ss')}`);
        console.log(
          '------------------------------------请求结束------------------------------------'
        );

        ctx.logger.info(`返回结果:${JSON.stringify(ctx.response.body)}`);
        ctx.logger.info(
          `接口耗时: ${endTime.diff(startTime, 'milliseconds')}ms`
        );
        ctx.logger.info(
          `请求结束时间: ${endTime.format('YYYY-MM-DD HH:mm:ss')}`
        );
        ctx.logger.info(
          '------------------------------------请求结束------------------------------------'
        );
      }
    };
  }

  static getName(): string {
    return 'report';
  }
}
