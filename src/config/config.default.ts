import {MidwayConfig} from '@midwayjs/core';
// @ts-ignore
import * as packageJson from '../../package.json';

export default {
  // use for cookie sign key, should change to your own and keep security
  keys: '1729500811152_6775',
  koa: {
    port: 7001,
    globalPrefix: '/api',
  },
  // 添加orm配置
  typeorm: {
    dataSource: {
      default: {
        type: 'mysql',
        driver: require('mysql2'),
        host: '127.0.0.1',      // 改成你的mysql数据库IP
        port: 3306,             // 改成你的mysql数据库端口
        username: 'root',       // 改成你的mysql数据库用户名（需要有创建表结构权限）
        password: 'root',     // 改成你的mysql数据库密码
        database: 'midway_db',// 改成你的mysql数据库
        synchronize: true,      // 如果第一次使用，不存在表，有同步的需求可以写 true
        logging: true,
        entities: ['entity', '**/*.entity.{j,t}s',],
        dateStrings: true,
      }
    }
  },
  redis: {
    client: {
      host: '127.0.0.1',
      port: 6379,
      db: 0,
    },
  },
  // 模板渲染
  view: {
    mapping: {
      '.html': 'ejs',
    },
  },
  jwt: {
    secret: 'setscrew',
    expiresIn: 60 * 60 * 24,
  },
  app: {
    security: {
      prefix: '/api',     // 指定已/api开头的接口地址需要拦截
      ignore: ['/api/user/login', '/api/captcha/getCaptcha', '/api/user/add'],   // 指定该接口地址，不需要拦截
    },
  },
  swagger: {
    title: packageJson.name,
    description: packageJson.description,
    version: packageJson.version,
    tags: [
      {
        name: '/',
        description: '默认'
      },
      {
        name: 'captcha',
        description: '验证码'
      },
    ],
    auth: {
      authType: 'bearer',
    },
  },
} as MidwayConfig;
