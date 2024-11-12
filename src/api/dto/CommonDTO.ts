import {ApiProperty} from "@midwayjs/swagger";

/**
 * 用户登陆DTO
 */
export class loginDTO {
  @ApiProperty({example: 'admin', description: '登录-用户名'})
  userName: string;

  @ApiProperty({example: '123456', description: '登录-密码'})
  password: string;

  @ApiProperty({example: '1651561651658', description: '登录-验证码id'})
  captchaId: string

  @ApiProperty({example: '8', description: '登录-验证码'})
  captcha: string
}
