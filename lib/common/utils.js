"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fnLoadingByOra = exports.promisify = void 0;
const ora = require('ora');
function promisify(fn) {
    return (...args) => {
        return new Promise((resolve, reject) => {
            args.push((err, data) => {
                err ? reject(err) : resolve(data);
            });
            // @ts-ignore
            fn.apply(this, args);
        });
    };
}
exports.promisify = promisify;
// 封装loading效果
const fnLoadingByOra = async (fn, message) => {
    const spinner = ora(message);
    spinner.start();
    let result = await fn();
    spinner.succeed('下载成功');
    return result;
};
exports.fnLoadingByOra = fnLoadingByOra;
