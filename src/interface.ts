import '@midwayjs/core';
import {UserContext} from "./common/Context";

/**
 * @description UserEntity-Service parameters
 */
export interface IUserOptions {
  uid: number;
}

declare module '@midwayjs/core' {
  interface Context {
    userContext: UserContext;
  }
}
