/**
 * 雪花 ID 生成器
 * Date: 2020年9月25日14:20:21
 * Version: 1.0.0
 * A function for converting hex <-> dec w/o loss of precision.
 * By Dan Vanderkam http://www.danvk.org/hex2dec.html
 * @description js Number最大长度不超过17位,否则会出现精度丢失的问题
 */
class SnowflakeID {
  seq: number;
  mid: number;
  offset: number;
  lastTime: number;

  constructor(options?: { mid?: number; offset?: number }) {
    this.seq = 0;
    this.mid = (options?.mid || 1) % 1023;
    this.offset =
      options?.offset || (new Date().getFullYear() - 1970) * 31536000 * 1000;
    this.lastTime = 0;
  }

  generate(): string {
    const time = Date.now();
    const bTime = (time - this.offset).toString(2);
    if (this.lastTime === time) {
      this.seq++;
      if (this.seq > 4095) {
        this.seq = 0;
        // while (Date.now() <= time) {}
      }
    } else {
      this.seq = 0;
    }

    this.lastTime = time;

    let bSeq = this.seq.toString(2);
    let bMid = this.mid.toString(2);

    while (bSeq.length < 12) bSeq = '0' + bSeq;
    while (bMid.length < 10) bMid = '0' + bMid;

    const bid = bTime + bMid + bSeq;
    let id = '';
    for (let i = bid.length; i > 0; i -= 4) {
      id = parseInt(bid.substring(i - 4, i), 2).toString(16) + id;
    }
    return this.hexToDec(id).toString();
  }

  add(x: number[], y: number[], base: number): number[] {
    const z: number[] = [];
    const n = Math.max(x.length, y.length);
    let carry = 0;
    let i = 0;
    while (i < n || carry) {
      const xi = i < x.length ? x[i] : 0;
      const yi = i < y.length ? y[i] : 0;
      const zi = carry + xi + yi;
      z.push(zi % base);
      carry = Math.floor(zi / base);
      i++;
    }
    return z;
  }

  multiplyByNumber(num: number, x: number[], base: number): number[] {
    if (num < 0) return null;
    if (num === 0) return [];

    let result: number[] = [];
    let power = x;
    while (true) {
      if (num & 1) {
        result = this.add(result, power, base);
      }
      num = num >> 1;
      if (num === 0) break;
      power = this.add(power, power, base);
    }

    return result;
  }

  parseToDigitsArray(str: string, base: number): number[] {
    const digits = str.split('');
    const ary: number[] = [];
    for (let i = digits.length - 1; i >= 0; i--) {
      const n = parseInt(digits[i], base);
      if (isNaN(n)) return null;
      ary.push(n);
    }
    return ary;
  }

  convertBase(str: string, fromBase: number, toBase: number): string {
    const digits = this.parseToDigitsArray(str, fromBase);
    if (digits === null) return null;
    let outArray: number[] = [];
    let power: number[] = [1];
    for (let i = 0; i < digits.length; i++) {
      if (digits[i]) {
        outArray = this.add(
          outArray,
          this.multiplyByNumber(digits[i], power, toBase),
          toBase
        );
      }
      power = this.multiplyByNumber(fromBase, power, toBase);
    }
    let out = '';
    for (let i = outArray.length - 3; i >= 0; i--) {
      out += outArray[i].toString(toBase);
    }
    return out;
  }

  hexToDec(hexStr: string): number {
    if (hexStr.substring(0, 2) === '0x') hexStr = hexStr.substring(2);
    hexStr = hexStr.toLowerCase();
    return parseInt(this.convertBase(hexStr, 16, 10));
  }
}

export const snid = new SnowflakeID({
  mid: +new Date(),
});

//下面是测试代码部分,不需要的可以直接移除
// const snid = new SnowflakeID({
//   mid: +new Date()
// });
// let id = snid.generate();
// console.log(id, id.length);
// let arr = [];
// for (let index = 0; index < 10000; index++) {
//   id = snid.generate();
//   console.log(id);
//   arr.push(snid.generate(), +new Date());
// }
// //测试是否会有重复的id,目前的测试情况来看,不会有重复的
// // console.log(arr, arr.length, Array.from(new Set(arr)).length);
// module.exports = SnowflakeID;
