import { Configuration, App } from '@midwayjs/core';
import * as koa from '@midwayjs/koa';
import * as validate from '@midwayjs/validate';
import * as info from '@midwayjs/info';
import { join } from 'path';
import { DefaultErrorFilter } from './filter/default.filter';
import { NotFoundFilter } from './filter/notfound.filter';
import { ReportMiddleware } from './middleware/report.middleware';
import { FormatMiddleware } from './middleware/format.middleware';
import { SecurityMiddleware } from './middleware/security.middleware'
import * as view from '@midwayjs/view-ejs';
import * as orm from '@midwayjs/orm';
import * as jwt from '@midwayjs/jwt';
import * as redis from '@midwayjs/redis';
import * as swagger from '@midwayjs/swagger';
import * as captcha from '@midwayjs/captcha';

@Configuration({
  imports: [
    koa,
    view,
    validate,
    orm,
    jwt,
    redis,
    swagger,
    captcha,
    {
      component: info,
      enabledEnvironment: ['local'],
    },
  ],
  importConfigs: [join(__dirname, './config')],
})
export class MainConfiguration {
  @App('koa')
  app: koa.Application;

  async onReady() {
    // add middleware
    this.app.useMiddleware([SecurityMiddleware, FormatMiddleware, ReportMiddleware]);
    // add filter
    this.app.useFilter([NotFoundFilter, DefaultErrorFilter]);
  }
}
