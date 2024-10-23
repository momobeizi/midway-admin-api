import { MidwayError } from '@midwayjs/core';

export class CommonException extends MidwayError {
  code: number;
  msg: string;
  data: any;
  constructor(code: number, msg: string) {
    super(msg, code.toString());
    this.code = code;
    this.msg = msg;
  }
}
