import {ApiTags} from "@midwayjs/swagger";
import {Controller, Inject, Body, Post} from "@midwayjs/core";
import {UserService} from "../../service/user/user.service";
import {Validate} from "@midwayjs/validate";
import {addUserDTO} from "../../api/dto/UserDTO";

@ApiTags(['user'])
@Controller('/user')
export class CommonController {
  @Inject()
  userService: UserService;

  @Post('/add', {
    summary: '添加用户',
    description: '添加用户接口',
  })
  @Validate()
  public async add(@Body() params: addUserDTO) {
    return await this.userService.add(params);
  }
}
