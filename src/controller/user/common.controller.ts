import {ApiTags} from "@midwayjs/swagger";
import {Controller, Inject, Body, Post} from "@midwayjs/core";
import {UserService} from "../../service/user/user.service";
import {Validate} from "@midwayjs/validate";
import {loginDTO} from "../../api/dto/CommonDTO";

@ApiTags(['user'])
@Controller('/user')
export class CommonController {
  @Inject()
  userService: UserService;

  @Post('/login', {
    summary: '登录',
    description: '用户登录接口',
  })
  @Validate()
  public async login(@Body() params: loginDTO) {
    return await this.userService.login(params);
  }
}
