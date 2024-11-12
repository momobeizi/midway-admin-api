import {Inject, Provide} from "@midwayjs/core";
import {CaptchaService} from "@midwayjs/captcha"
import {captchaVO} from "../api/vo/CommonVO";
import {captcha} from "../types/captcha";

@Provide()
export class CaptchasService {

  @Inject()
  captchaService: CaptchaService

  public async getCaptcha() {
    const {id, imageBase64} = await this.captchaService.image({width: 120, height: 40});
    const vo = new captchaVO()
    vo.captchaId = id
    vo.captchaBase64 = imageBase64
    return vo
  }

  public async checkCaptcha(params: captcha) {
    return await this.captchaService.check(params.captchaId, params.captcha)
  }
}
