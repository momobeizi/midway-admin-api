import {Inject, Provide} from '@midwayjs/core';
import {loginDTO} from "../../api/dto/CommonDTO";
import {UserEntity} from "../../entity/user/user.entity"
import {InjectEntityModel} from "@midwayjs/typeorm";
import {Repository} from "typeorm";
import {CaptchasService} from '../captchas.service'
import {Assert} from "../../common/Assert";
import {addUserDTO} from "../../api/dto/UserDTO";
import {encrypt} from "../../utils/PasswordEncoder";
import {snid} from "../../utils/snowflakeID";


@Provide()
export class UserService {
  @InjectEntityModel(UserEntity)
  userModel: Repository<UserEntity>;

  @Inject()
  captchasService: CaptchasService

  /**
   * 获取用户信息
   */
  async getUserInfo() {
    return {
      username: 'mockedName',
      phone: '12345678901',
      email: 'xxx.xxx@xxx.com',
    };
  }

  /**
   * 用户登录
   * @param {Object} params - 登录入参
   * @param { string } params.userName - 用户名
   * @param { string } params.password - 密码
   * @param { string } params.captchaId - 验证码id
   * @param { string } params.captcha - 验证码
   * */
  public async login(params: loginDTO) {
    //调用验证码校验
    await this.captchasService.checkCaptcha(params);
    //校验验证码是否正确
    const user = await this.userModel.findOne({
      where: {username: params.userName},
    });
    Assert.notNull(user, 400, '用户不存在')
    console.log(user);
  }

  public async add(params: addUserDTO) {
    //判断用户名是否存在
    const result = await this.userModel.findOne({where: {username: params.userName}});
    Assert.notNull(!result, 400, '用户名重复')
    //不存在该用户，创建用户
    const user = new UserEntity()
    user.id = snid.generate()
    user.username = params.userName;
    user.password = encrypt(params.password);
    user.name = params.name;
    user.phone = params.phone;
    user.email = params.email;
    user.avatar = params.avatar;
    user.status = 1
    //执行插入用户操作
    return await this.userModel.save(user);
  }
}
