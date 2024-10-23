import {Controller, Get, Inject} from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
// @ts-ignore
import * as packageJson from '../../package.json';

@Controller('/')
export class WelcomeController {
  @Inject()
  ctx: Context;

  @Get('/')
  public async welcome(): Promise<void> {
    await this.ctx.render('welcome', {
      data: `欢迎使用midway-admin-api v${packageJson.version}`,
    });
  }
}
