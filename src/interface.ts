import '@midwayjs/core';
import {UserContext} from "./common/Context";

/**
 * @description User-Service parameters
 */
export interface IUserOptions {
  uid: number;
}

declare module '@midwayjs/core' {
  interface Context {
    userContext: UserContext;
  }
}
