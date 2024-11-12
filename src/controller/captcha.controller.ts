import {Controller, Get, Inject} from "@midwayjs/core";
import {ApiResponse, ApiTags} from "@midwayjs/swagger";
import {captchaVO} from "../api/vo/CommonVO";
import {CaptchasService} from "../service/captchas.service";

@ApiTags(['captcha'])
@Controller('/captcha')
export class CaptchaController {
  @Inject()
  captchasService: CaptchasService

  @ApiResponse({type: captchaVO})
  @Get('/getCaptcha', {
    summary: '验证码',
    description: '获取登录验证码',
  })
  public async getCaptcha() {
    return await this.captchasService.getCaptcha()
  }
}
