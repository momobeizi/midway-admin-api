import {ApiProperty} from "@midwayjs/swagger";

/**
 * 添加用户DTO
 */
export class addUserDTO {
  @ApiProperty({example: 'admin', description: '用户名'})
  userName: string;

  @ApiProperty({example: '123456', description: '密码'})
  password: string;

  @ApiProperty({example: 'admin', description: '昵称'})
  name: string;

  @ApiProperty({example: '17623142317', description: '手机号'})
  phone: string;

  @ApiProperty({example: '97624915@qq.com', description: '邮箱'})
  email: string;

  @ApiProperty({example: '/img/xxx.png', description: '头像'})
  avatar: string;
}
