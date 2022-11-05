const ora = require('ora');

type Fn = (...args: any) => any;

export function promisify(fn: Fn): Fn {
  return (...args: any[]) => {
    return new Promise((resolve, reject) => {
      args.push((err: any, data: any) => {
        err ? reject(err) : resolve(data);
      });
      // @ts-ignore
      fn.apply(this, args);
    });
  };
}
// 封装loading效果
export const fnLoadingByOra = async (fn: Fn, message: string) => {
  const spinner = ora(message);
  spinner.start();
  let result = await fn();
  spinner.succeed('下载成功');
  return result;
};


