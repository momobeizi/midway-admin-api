export class ErrorCode {
  /**
   * 200 正常
   */
  static OK = 200;
  /**
   * 400000-500000 平台异常
   */
  static SYS_ERROR = 400000;
  /**
   * 50000 未知异常
   */
  static UN_ERROR = 500000;
  /**
   * 60000-69999 基本的业务异常
   */
  static BIZ_ERROR = 600000;
}
