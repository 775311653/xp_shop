// import './interface/NumberOperation.d.ts';

export function NumberOperation() {
  function accDiv(arg1: number, arg2: number): number {
    let t1 = 0, t2 = 0, r1, r2;
    try {
      t1 = arg1.toString().split(".")[1].length;
    } catch (e) {
    }
    try {
      t2 = arg2.toString().split(".")[1].length;
    } catch (e) {
    }
    r1 = Number(arg1.toString().replace(".", ""));
    r2 = Number(arg2.toString().replace(".", ""));
    return (r1 / r2) * Math.pow(10, t2 - t1);
  }

  Number.prototype.div = function (this: number, arg: number): number {
    return accDiv(this, arg);
  };

  function accMul(arg1: number, arg2: number): number {
    let m = 0, s1 = arg1.toString(), s2 = arg2.toString();
    try {
      m += s1.split(".")[1].length;
    } catch (e) {
    }
    try {
      m += s2.split(".")[1].length;
    } catch (e) {
    }
    return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
  }

  Number.prototype.mul = function (this: number, arg: number): number {
    return accMul(this, arg);
  };

  function accAdd(arg1: number, arg2: number): number {
    let r1, r2, m;
    try {
      r1 = arg1.toString().split(".")[1].length;
    } catch (e) {
      r1 = 0;
    }
    try {
      r2 = arg2.toString().split(".")[1].length;
    } catch (e) {
      r2 = 0;
    }
    m = Math.pow(10, Math.max(r1, r2));
    return (arg1 * m + arg2 * m) / m;
  }

  Number.prototype.add = function (this: number, arg: number): number {
    return accAdd(this, arg);
  };

  function accDel(arg1: number, arg2: number): number {
    let r1, r2, m, n;
    try {
      r1 = arg1.toString().split(".")[1].length;
    } catch (e) {
      r1 = 0;
    }
    try {
      r2 = arg2.toString().split(".")[1].length;
    } catch (e) {
      r2 = 0;
    }
    m = Math.pow(10, Math.max(r1, r2));
    n = (r1 >= r2) ? r1 : r2;
    return Number(((arg1 * m - arg2 * m) / m).toFixed(n));
  }

  Number.prototype.del = function (this: number, arg: number): number {
    return accDel(this, arg);
  };

  return {
    accDiv,
    accMul,
    accAdd,
    accDel
  }
}

export interface Number {
  div(arg: number): number;
  mul(arg: number): number;
  add(arg: number): number;
  del(arg: number): number;
}
