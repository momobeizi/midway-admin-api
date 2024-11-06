import {ApiProperty} from "@midwayjs/swagger";

/**
 * 获取验证码返回VO
 */
export class captchaVO {
  @ApiProperty({example: '3wCNWlJv93Bsa6lTWTVYQ', description: '验证码id'})
  captchaId: string;

  @ApiProperty({example: 'data:image/svg+xml,xxxxx', description: '验证码base64'})
  captchaBase64: string;
}
